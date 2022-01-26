import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

/**
 * Responds to friend request by either accepting or rejecting it.
 * @param {String} userId ID of user responding to request.
 * @param {String} requesterId ID of user who has requested.
 * @param {Boolean} accept true for accepting, false for rejecting. Default is true
 */
const respondRequest = async (userId, requesterId, accept = true) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(requesterId))
    throw new APIError(400, 'Invalid requester ID provided');

  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(400, 'No user was found with given user ID');

  const requester = await User.findById(requesterId).exec();
  if (!requester)
    throw new APIError(400, 'No user was found with given requester ID');

  if (user.friends.includes(requesterId))
    throw new APIError(403, 'Provided user is already your friend');
  if (!user.inRequests.includes(requesterId))
    throw new APIError(403, 'Provided user has not sent you a friend request');

  user.inRequests.pull(requesterId);
  requester.outRequests.pull(userId);
  if (accept) {
    user.friends.addToSet(requesterId);
    requester.friends.addToSet(userId);
  }

  await Promise.all([user.save(), requester.save()]);
};

export default respondRequest;
