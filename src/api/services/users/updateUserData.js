const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');
const { userUpdateSchema } = require('../../validations/validationSchema');

const updateUserData = async (id, userObj) => {
  if (!mongoose.isValidObjectId(id))
    throw new APIError(400, 'Invalid user ID provided');

  const result = userUpdateSchema.validate(userObj);
  const errMessage = result?.error?.details[0]?.message;

  if (result.error) throw new APIError(400, errMessage);

  const user = await User.findOne({ _id: id }).exec();
  if (!user) throw new Error('No user was found with given ID');

  if (Object.hasOwnProperty.call(userObj, 'password')) {
    const hash = await bcrypt.hash(userObj.password, 8);
    user.hash = hash;
  }

  Object.keys(userObj).forEach((key) => {
    if (userObj[key]) {
      if (key !== 'password') user[key] = userObj[key];
    }
  });

  const updatedUser = await user.save();
  if (!updatedUser)
    throw new APIError(500, 'Your profile data could not be updated');

  const newUserObj = updatedUser.toObject();
  delete newUserObj.hash;

  return newUserObj;
};

module.exports = updateUserData;
