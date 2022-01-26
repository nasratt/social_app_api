import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';
import unFriend from './unFriend.js';

const block = async (userId, blockId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(blockId))
    throw new APIError(400, 'Invalid block ID provided');

  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(404, 'No user was found with given user ID');

  if (user.blocked.includes(blockId))
    throw new APIError(403, 'Provided user is already blocked by you');

  if (user.friends.includes(blockId)) await unFriend(userId, blockId);
  user.blocked.push(blockId);

  await user.save();
};

export default block;
