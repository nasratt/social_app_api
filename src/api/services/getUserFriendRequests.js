import User from '../models/user.model.js';

const getUserFriendRequests = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate(
        'inRequests',
        '-hash -verified -inRequests -outRequests -blocked'
      )
      .exec();
    if (!user) throw new Error('Invalid user id provided');
    return {
      friendRequests: user.inRequests
    };
  } catch (err) {
    throw err;
  }
};

export default getUserFriendRequests;
