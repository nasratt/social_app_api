import getUserFriends from '../services/getUserFriends.js';
import sendRequest from '../services/sendRequest.js';
import respondRequest from '../services/respondRequest.js';
import unFriend from '../services/unFriend.js';
import getUserFriendRequests from '../services/getUserFriendRequests.js';
import suggestFriends from '../services/suggestFriends.js';
import block from '../services/block.js';
import unBlock from '../services/unBlock.js';

const sendFriendRequest = async (req, res) => {
  const {
    recieverId,
    tokenData: { id }
  } = req.body;

  try {
    const result = await sendRequest(id, recieverId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  const {
    requesterId,
    tokenData: { id }
  } = req.body;

  try {
    await respondRequest(id, requesterId);
    res.status(201).json({
      success: true,
      message: 'You have successfully accepted the request'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  const {
    requesterId,
    tokenData: { id }
  } = req.body;

  try {
    await respondRequest(id, requesterId, false);
    res.status(201).json({
      success: true,
      message: 'Friend request was rejected'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllFriends = async (req, res) => {
  try {
    const result = await getUserFriends(req.body.tokenData.id);

    if (!result.success) throw new Error(result.message);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFriend = async (req, res) => {
  const {
    friendId,
    tokenData: { id }
  } = req.body;

  try {
    await unFriend(id, friendId);
    res.status(204).json({
      success: true,
      message: 'The user was successfully removed from your friends list'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllFriendRequests = async (req, res) => {
  const {
    tokenData: { id }
  } = req.body;

  try {
    const data = await getUserFriendRequests(id);
    res.status(200).json({
      success: true,
      message: 'Friend requests are successfully retrieved',
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getFriendSuggestions = async (req, res) => {
  const {
    tokenData: { id }
  } = req.body;

  try {
    const suggestions = await suggestFriends(id);
    res.status(200).json({
      success: true,
      message: 'Friend suggestions for you is retrieved',
      data: { suggestions }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const blockUser = async (req, res) => {
  const {
    blockId,
    tokenData: { id }
  } = req.body;

  try {
    await block(id, blockId);
    res.status(200).json({
      success: true,
      message: 'User was successfully blocked'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const unBlockUser = async (req, res) => {
  const {
    blockId,
    tokenData: { id }
  } = req.body;

  try {
    await unBlock(id, blockId);
    res.status(200).json({
      success: true,
      message: 'User was successfully unblocked'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export {
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
