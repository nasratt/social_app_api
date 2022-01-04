import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

const doesCredentialsMatch = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('invalid email provided');

    if (!user.verified)
      throw new Error('your email is not verified, login not allowed');

    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) throw new Error('invalid password provided');

    return {
      success: true,
      message: 'credentials match',
      user
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};

export default doesCredentialsMatch;
