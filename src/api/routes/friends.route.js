import express from 'express';

import {
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getAllFriendRequests,
  getFriendSuggestions,
  blockUser,
  unBlockUser
} from '../controllers/friends.controller.js';

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

export default friendsRouter;
