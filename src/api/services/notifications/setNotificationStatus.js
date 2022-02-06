import APIError from '../../helpers/apiError.js';
import User from '../../models/user.model.js';

const setNotificationStatus = async (userId, status) => {
  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(404, 'No user was found with given ID');

  user.notifications = status;
  await user.save();
};

export default setNotificationStatus;
