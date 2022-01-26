import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const sendRequest = async (senderId, recieverId) => {
  const sender = await User.findById(senderId).exec();
  if (!sender) throw new APIError(400, 'Invalid sender id provided');

  const reciever = await User.findById(recieverId).exec();
  if (!reciever) throw new APIError(400, 'Invalid reciever id provided');

  if (reciever.blocked.includes(senderId))
    throw new APIError(
      403,
      'You have been blocked by user, can not send friend request'
    );

  if (sender.friends.includes(recieverId))
    throw new APIError(403, 'The provided user is already your friend');

  if (sender.inRequests.includes(recieverId))
    throw new APIError(
      403,
      'The provided user has already sent you a friend request'
    );

  if (sender.outRequests.includes(recieverId))
    throw new APIError(
      403,
      'You have already sent a friend request to provided user'
    );

  sender.outRequests.addToSet(recieverId);
  reciever.inRequests.addToSet(senderId);
  await Promise.all([sender.save(), reciever.save()]);
};

export default sendRequest;
