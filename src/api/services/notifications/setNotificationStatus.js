const APIError = require('../../helpers/apiError');
const User = require('../../models/user.model');

const setNotificationStatus = async (userId, status) => {
  const user = await User.findById(userId).exec();
  if (!user) throw new APIError(404, 'No user was found with given ID');

  user.notifications = status;
  await user.save();
};

module.exports = setNotificationStatus;
