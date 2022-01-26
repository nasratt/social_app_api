import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';
import { userUpdateSchema } from '../../validations/validationSchema.js';

const updateUserData = async (id, userObj) => {
  if (!mongoose.isValidObjectId(id))
    throw new APIError(400, 'Invalid user ID provided');

  const user = await User.findOne({ _id: id }).exec();
  if (!user) throw new Error('No user was found with given ID');

  if (userObj.hasOwnProperty('password')) {
    const hash = await bcrypt.hash(userObj.password, 8);
    user.hash = hash;
  }

  Object.keys(userObj).forEach((key) => {
    if (userObj[key]) {
      if (key !== 'password') user[key] = userObj[key];
    }
  });

  const updatedUser = await user.save();
  if (!updatedUser)
    throw new APIError(500, 'Your profile data could not be updated');

  const newUserObj = updatedUser.toObject();
  delete newUserObj.hash;

  return newUserObj;
};

export default updateUserData;
