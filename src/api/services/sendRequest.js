import User from '../models/user.model.js';

const sendRequest = async (senderId, recieverId) => {
  try {
    const sender = await User.findById(senderId).exec();
    if (!sender) throw new Error('Invalid sender id provided');

    const reciever = await User.findById(recieverId).exec();
    if (!reciever) throw new Error('Invalid reciever id provided');

    if (reciever.blocked.includes(senderId))
      throw new Error(
        'You have been blocked by user, can not send friend request'
      );

    if (sender.friends.includes(recieverId))
      throw new Error('The provided user is already your friend');

    if (sender.inRequests.includes(recieverId))
      throw new Error(
        'The provided user has already sent you a friend request'
      );

    if (sender.outRequests.includes(recieverId))
      throw new Error(
        'You have already sent a friend request to provided user'
      );

    sender.outRequests.addToSet(recieverId);
    reciever.inRequests.addToSet(senderId);
    await Promise.all([sender.save(), reciever.save()]);
    return {
      success: true,
      message: 'friend request was successfully sent'
    };
  } catch (err) {
    throw err;
  }
};

export default sendRequest;
