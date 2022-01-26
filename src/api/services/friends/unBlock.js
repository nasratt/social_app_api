import mongoose from 'mongoose';

import User from '../../models/user.model.js';

import APIError from '../../helpers/apiError.js';

const unBlock = async (userId, blockedId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(blockedId))
    throw new APIError(400, 'Invalid blocked ID provided');

  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(404, 'No user was found with given user ID');

  if (!user.blocked.includes(blockedId))
    throw new APIError(400, 'Provided user is not blocked by you');

  user.blocked.pull(blockedId);
  await user.save();
};

export default unBlock;
