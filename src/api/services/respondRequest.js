import User from '../models/user.model.js';
/**
 * Responds to friend request by either accepting to rejecting it.
 * @param {String} userId ID of user responding to request.
 * @param {String} requesterId ID of user who has requested.
 * @param {Boolean} accept true for accepting, false for rejecting. Default is true
 */
const respondRequest = async (userId, requesterId, accept = true) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) throw new Error('Invalid user id provided');

    const requester = await User.findById(requesterId).exec();
    if (!requester) throw new Error('Invalid requester id provided');

    if (user.friends.includes(requesterId))
      throw new Error('Provided user is already your friend');
    if (!user.inRequests.includes(requesterId))
      throw new Error('Provided user has not sent you a friend request');

    user.inRequests.pull(requesterId);
    requester.outRequests.pull(userId);
    if (accept) {
      user.friends.addToSet(requesterId);
      requester.friends.addToSet(userId);
    }

    await Promise.all([user.save(), requester.save()]);
  } catch (err) {
    throw err;
  }
};

export default respondRequest;
