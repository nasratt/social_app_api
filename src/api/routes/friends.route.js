const express = require('express');

const {
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getAllFriendRequests,
  getFriendSuggestions,
  blockUser,
  unBlockUser
} = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.get('/', getAllFriends);
friendsRouter.get('/requests', getAllFriendRequests);
friendsRouter.get('/suggestions', getFriendSuggestions);
friendsRouter.post('/add', sendFriendRequest);
friendsRouter.post('/accept', acceptFriendRequest);
friendsRouter.post('/reject', rejectFriendRequest);
friendsRouter.post('/remove', removeFriend);
friendsRouter.post('/block', blockUser);
friendsRouter.post('/unblock', unBlockUser);

module.exports = friendsRouter;
