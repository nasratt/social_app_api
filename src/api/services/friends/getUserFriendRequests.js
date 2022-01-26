import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const getUserFriendRequests = async (userId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const user = await User.findById(userId)
    .populate('inRequests', '-hash -verified -inRequests -outRequests -blocked')
    .exec();
  if (!user) throw new APIError(404, 'No user was found with given user ID');
  return user.inRequests;
};

export default getUserFriendRequests;
