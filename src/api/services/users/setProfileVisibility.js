const mongoose = require('mongoose');

const APIError = require('../../helpers/apiError');
const User = require('../../models/user.model');

const { ObjectId } = mongoose.Types;

const setProfileVisibility = async (userId, value) => {
  const user = await User.findOne(
    { _id: ObjectId(userId) },
    { hash: false, __v: false }
  ).exec();
  if (!user) throw new APIError(404, 'No user was found with given ID');

  user.visibility = value;
  const updatedUser = user.save();
  if (!updatedUser)
    throw new APIError(500, 'Your profile visibility could not be updated');
  return updatedUser;
};

module.exports = setProfileVisibility;
