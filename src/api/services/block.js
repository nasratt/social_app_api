import User from '../models/user.model.js';
import unFriend from './unFriend.js';

const block = async (userId, blockId) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) throw new Error('Invalid user id provided');

    if (user.blocked.includes(blockId))
      throw new Error('Provided user is already blocked by you');

    if (user.friends.includes(blockId)) await unFriend(userId, blockId);
    user.blocked.push(blockId);

    await user.save();
  } catch (err) {
    throw err;
  }
};

export default block;
