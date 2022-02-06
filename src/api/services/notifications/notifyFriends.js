const User = require('../../models/user.model');
const sendNotification = require('./sendNotification');

const notifyFriends = async (friends, fn) => {
  friends.forEach(async (id) => {
    const friend = await User.findById(id).exec();

    if (friend?.notifications) {
      const notification = fn(friend);
      await sendNotification(friend.email, notification);
    }
  });
};

module.exports = notifyFriends;
