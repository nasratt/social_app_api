import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const getUserData = async (userId, searchId) => {
  if (!mongoose.isValidObjectId(searchId))
    throw new APIError(400, 'Invalid user ID provided');

  const projection = {
    hash: false,
    createdAt: false,
    updatedAt: false,
    inRequests: false,
    outRequests: false,
    __v: false
  };

  const user = await User.findOne({ _id: searchId }, projection).exec();
  if (!user || user.blocked.includes(userId))
    throw new APIError(404, 'No user was found with given ID');

  const isFriend = user.friends.includes(userId);
  if (searchId === userId || isFriend) return user;
  return {
    _id: user._id,
    fname: user.fname,
    lname: user.lname,
    profilePic: user.profilePic
  };
};

export default getUserData;
