import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import catchErrors from '../helpers/catchErrors.js';
import APIError from '../helpers/apiError.js';
import {
  sendVerificationEmail,
  verifyUserEmail,
  getUserData,
  updateUserData,
  fetchUsersData
} from '../services/users/index.js';

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

  const user = await getUserData(id, tokenData.id);
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

  if (!name && !email) throw new APIError(400, 'Please provide a search term');

  const usersFound = await fetchUsersData(name, email, +page, +limit);

  res.status(200).json({
    success: true,
    message: 'Following users were found',
    data: { users: usersFound }
  });
});

const resetPassword = catchErrors(async (req, res) => {
  const { id, password } = req.body;

  const result = await updateUserData(id, { password });

  if (!result.success) throw new Error(result);
  res
    .status(200)
    .json({ success: true, message: 'Password was successfully reset' });
});

export {
  signupUser,
  verifyEmail,
  loginUser,
  sendUserData,
  updateUser,
  findUsers,
  resetPassword
};
