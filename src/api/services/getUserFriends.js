import User from '../models/user.model.js';

const getUserFriends = async (userId) => {
  try {
    const user = await User.findOne(
      { _id: userId },
      { friends: true, _id: false }
    )
      .populate('friends', '_id fname lname')
      .exec();

    return {
      success: true,
      message: 'friends list succussfully retrieved',
      friends: user.friends
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};

export default getUserFriends;
