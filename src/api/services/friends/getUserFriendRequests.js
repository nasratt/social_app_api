const mongoose = require('mongoose');

const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');

const getUserFriendRequests = async (userId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const user = await User.findById(userId)
    .populate('inRequests', '-hash -verified -inRequests -outRequests -blocked')
    .exec();
  if (!user) throw new APIError(404, 'No user was found with given user ID');
  return user.inRequests;
};

module.exports = getUserFriendRequests;
