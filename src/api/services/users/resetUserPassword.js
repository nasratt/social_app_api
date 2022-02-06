const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const APIError = require('../../helpers/apiError');
const User = require('../../models/user.model');
const { resetPassSchema } = require('../../validations/validationSchema');

const resetUserPassword = async (token, password) => {
  const { email } = await jwt.verify(token, process.env.JWT_SECRET);

  const result = resetPassSchema.validate({ email, password });
  if (result.error) throw new APIError(400, result.error.details[0].message);

  const user = await User.findOne({ email }).exec();
  if (!user) throw new APIError(404, 'No user was found with given email');

  if (!user.verified)
    throw new APIError(409, 'Email is not verified, cannot reset password');

  const hash = await bcrypt.hash(password, 8);
  user.hash = hash;
  await user.save();
};

module.exports = resetUserPassword;
