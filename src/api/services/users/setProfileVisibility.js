import mongoose from 'mongoose';

import APIError from '../../helpers/apiError.js';
import User from '../../models/user.model.js';

const { ObjectId } = mongoose.Types;

const setProfileVisibility = async (userId, value) => {
  const user = await User.findOne(
    { _id: ObjectId(userId) },
    { hash: false, __v: false }
  ).exec();
  if (!user) throw new APIError(404, 'No user was found with given ID');

  user.visibility = value;
  const updatedUser = user.save();
  if (!updatedUser)
    throw new APIError(500, 'Your profile visibility could not be updated');
  return updatedUser;
};

export default setProfileVisibility;
