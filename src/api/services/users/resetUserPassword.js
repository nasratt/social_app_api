import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import APIError from '../../helpers/apiError.js';
import User from '../../models/user.model.js';
import { resetPassSchema } from '../../validations/validationSchema.js';

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

export default resetUserPassword;
