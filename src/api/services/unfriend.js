import User from '../models/user.model.js';

/**
 * Unfriends two users. If there is any error, it throws it, errors should be caught in callee.
 * @param {String} userId ID of user who is removing a friend
 * @param {String} friendId ID of friend to be removed
 */
const unFriend = async (userId, friendId) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) throw new Error('Invalid user id provided');

    if (!user.friends.includes(friendId))
      throw new Error('Provided user is not your friend');

    const friend = await User.findById(friendId).exec();
    if (!friend) throw new Error('Invalid friend id provided');

    user.friends.pull(friendId);
    friend.friends.pull(userId);
    await Promise.all([user.save(), friend.save()]);
  } catch (err) {
    throw err;
  }
};

export default unFriend;
