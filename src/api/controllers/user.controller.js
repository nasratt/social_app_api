const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const catchErrors = require('../helpers/catchErrors');
const APIError = require('../helpers/apiError');
const {
  pageLimitSchema,
  emailSchema
} = require('../validations/validationSchema');
const {
  sendVerificationEmail,
  verifyUserEmail,
  getUserData,
  updateUserData,
  fetchUsersData,
  sendPasswordResetEmail,
  resetUserPassword,
  setProfileVisibility
} = require('../services/users');

const { setNotificationStatus } = require('../services/notifications');

const signupUser = catchErrors(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const hash = await bcrypt.hash(password, 8);
  const newUser = new User({
    fname,
    lname,
    email,
    hash
  });

  const resNewUser = await newUser.save();
  await sendVerificationEmail(
    'Socail App API',
    'Email verification',
    resNewUser
  );

  res.status(201).json({
    success: true,
    message:
      'You have successfully signed up, please visit your email to verify your account',
    data: { id: resNewUser._id }
  });
});

const verifyEmail = catchErrors(async (req, res) => {
  await verifyUserEmail(req.body.id);
  res
    .status(200)
    .json({ success: true, message: 'Your email was verified successfully' });
});

const loginUser = catchErrors((req, res, next) => {
  const {
    user: { email, _id: id, fname, lname }
  } = req.body;

  const token = jwt.sign({ id, fname, lname, email }, process.env.JWT_SECRET);
  res.status(200).json({
    success: true,
    message: 'You have successfully logged in',
    data: {
      user: { id, fname, lname, email },
      token
    }
  });
});

const sendUserData = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { tokenData } = req.body;
  if (!id) throw new APIError(400, 'No ID provided');

  const user = await getUserData(tokenData.id, id);
  res.status(200).json({
    success: true,
    message: 'User profile data was successfully fetched',
    data: {
      user
    }
  });
});

const updateUser = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { tokenData, ...userNewData } = req.body;

  if (id !== tokenData.id)
    throw new APIError(403, 'You are not allowed to update given IDs data');

  const updatedUser = await updateUserData(id, userNewData);

  res.status(200).json({
    success: true,
    message: 'Your profile data was successfully updated',
    data: { user: updatedUser }
  });
});

const findUsers = catchErrors(async (req, res) => {
  const { name, email, page, limit } = req.query;
  const { tokenData } = req.body;

  if (!name && !email)
    throw new APIError(
      400,
      'Please provide a search term, either email or name'
    );

  const validationResult = pageLimitSchema.validate({ page, limit });
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  const queryOptions = { name, email, page: +page || 1, limit: +limit || 20 };
  const usersFound = await fetchUsersData(tokenData.id, queryOptions);

  res.status(200).json({
    success: true,
    message: 'Following users were found',
    data: { users: usersFound }
  });
});

const sendPasswordResetLink = catchErrors(async (req, res) => {
  const { email } = req.body;
  const result = emailSchema.validate(email);
  if (result.error) throw new APIError(400, result.error.details[0].message);

  await sendPasswordResetEmail('Social App API', 'Password Reset', email);
  res.status(200).json({
    success: true,
    message: 'Please check your email to reset your password'
  });
});

const resetPassword = catchErrors(async (req, res) => {
  const { token, password } = req.body;

  await resetUserPassword(token, password);
  res
    .status(200)
    .json({ success: true, message: 'Password was successfully reset' });
});

const changeProfileVisibility = catchErrors(async (req, res) => {
  const { visibility } = req.query;
  const { tokenData } = req.body;
  if (!['public', 'private'].includes(visibility))
    throw new APIError(
      400,
      'Visibility should be set as either "public" or "private"'
    );

  const updatedUser = await setProfileVisibility(tokenData.id, visibility);
  res.status(200).json({
    success: true,
    message: 'Your profile visibility was successfully changed',
    data: {
      user: updatedUser
    }
  });
});

const changeNotificationStatus = catchErrors(async (req, res) => {
  const { status } = req.query;
  const { tokenData } = req.body;

  if (!/on|off/i.test(status))
    throw new APIError(400, 'Status should be either "on" or "off"');

  await setNotificationStatus(tokenData.id, status === 'on');
  res.status(200).json({
    success: true,
    message: `Your notifications was successfully set to ${status}`
  });
});

module.exports = {
  signupUser,
  verifyEmail,
  loginUser,
  sendUserData,
  updateUser,
  findUsers,
  resetPassword,
  sendPasswordResetLink,
  changeProfileVisibility,
  changeNotificationStatus
};
