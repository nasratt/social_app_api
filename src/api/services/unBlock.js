import User from '../models/user.model.js';

const unBlock = async (userId, blockedId) => {
  try {
    const user = await User.findById(userId).exec();

    if (!user.blocked.includes(blockedId))
      throw new Error('Provided user is not blocked by you');

    user.blocked.pull(blockedId);
    await user.save();
  } catch (err) {
    throw err;
  }
};

export default unBlock;
