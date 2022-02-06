const {
  getUserFriends,
  sendRequest,
  respondRequest,
  unFriend,
  getUserFriendRequests,
  suggestFriends,
  block,
  unBlock
} = require('../services/friends');

const catchErrors = require('../helpers/catchErrors');

const sendFriendRequest = catchErrors(async (req, res) => {
  const {
    recieverId,
    tokenData: { id }
  } = req.body;

  await sendRequest(id, recieverId);

  res.status(200).json({
    success: true,
    message: 'Your friend request was successfully sent'
  });
});

const acceptFriendRequest = catchErrors(async (req, res) => {
  const {
    requesterId,
    tokenData: { id }
  } = req.body;

  await respondRequest(id, requesterId);
  res.status(200).json({
    success: true,
    message: 'You have successfully accepted the friend request'
  });
});

const rejectFriendRequest = catchErrors(async (req, res) => {
  const {
    requesterId,
    tokenData: { id }
  } = req.body;

  await respondRequest(id, requesterId, false);
  res.status(200).json({
    success: true,
    message: 'Friend request was rejected'
  });
});

const getAllFriends = catchErrors(async (req, res) => {
  const { page, limit } = req.query;
  const { tokenData } = req.body;

  const userFriends = await getUserFriends(tokenData.id, +page, +limit);

  res.status(200).json({
    success: true,
    message: 'Your friends list successfully fetched',
    data: {
      friends: userFriends
    }
  });
});

const removeFriend = catchErrors(async (req, res) => {
  const {
    friendId,
    tokenData: { id }
  } = req.body;

  await unFriend(id, friendId);
  res.status(200).json({
    success: true,
    message: 'The user was successfully removed from your friends list'
  });
});

const getAllFriendRequests = catchErrors(async (req, res) => {
  const {
    tokenData: { id }
  } = req.body;

  const friendRequests = await getUserFriendRequests(id);
  res.status(200).json({
    success: true,
    message: 'Friend requests were successfully fetched',
    data: {
      friendRequests
    }
  });
});

const getFriendSuggestions = catchErrors(async (req, res) => {
  const { page, limit } = req.query;
  const {
    tokenData: { id }
  } = req.body;

  const suggestions = await suggestFriends(id, +page, +limit);
  res.status(200).json({
    success: true,
    message: 'Friend suggestions was successfully fetched',
    data: { suggestions }
  });
});

const blockUser = catchErrors(async (req, res) => {
  const {
    blockId,
    tokenData: { id }
  } = req.body;

  await block(id, blockId);
  res.status(200).json({
    success: true,
    message: 'User was successfully blocked'
  });
});

const unBlockUser = catchErrors(async (req, res) => {
  const {
    blockId,
    tokenData: { id }
  } = req.body;

  await unBlock(id, blockId);
  res.status(200).json({
    success: true,
    message: 'User was successfully unblocked'
  });
});

module.exports = {
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getAllFriendRequests,
  getFriendSuggestions,
  blockUser,
  unBlockUser
};
