const mongoose = require('mongoose');

const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');

/**
 * Unfriends two users. If there is any error, it throws it, errors should be caught in callee.
 * @param {String} userId ID of user who is removing a friend
 * @param {String} friendId ID of friend to be removed
 */
const unFriend = async (userId, friendId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(friendId))
    throw new APIError(400, 'Invalid friend ID provided');

  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(404, 'No user was found with given user ID');

  if (!user.friends.includes(friendId))
    throw new APIError(400, 'Provided user is not your friend');

  const friend = await User.findById(friendId).exec();
  if (!friend)
    throw new APIError(404, 'No user was found with given friend ID');

  user.friends.pull(friendId);
  friend.friends.pull(userId);
  await Promise.all([user.save(), friend.save()]);
};

module.exports = unFriend;
