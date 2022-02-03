import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const getUserData = async (id, loggedInId) => {
  if (!mongoose.isValidObjectId(id))
    throw new APIError(400, 'Invalid user ID provided');

  const user = await User.findOne(
    { _id: id },
    { hash: false, createdAt: false, updatedAt: false, __v: false }
  ).exec();
  if (!user || user.blocked.includes(loggedInId))
    throw new APIError(404, 'No user was found with given ID');

  return id === loggedInId
    ? user
    : {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        profilePic: user.profilePic
      };
};

export default getUserData;
