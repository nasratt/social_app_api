import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

/**
 * Returns friends of a user in paginated format.
 * @param {String} userId ID of user whose friends is fetched
 * @param {Number} page Page number, default is 1
 * @param {Number} limit Number of results per page, default is 20
 * @returns {Array} Array of friends objects
 */
const getUserFriends = async (userId, page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit;

  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const user = await User.findById(userId, {
    friends: { $slice: [from, to] },
    _id: false
  })
    .populate('friends', '_id fname lname profilePic')
    .exec();

  return user.friends;
};

export default getUserFriends;
