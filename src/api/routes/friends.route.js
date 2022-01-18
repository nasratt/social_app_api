import express from 'express';

const friendsRouter = express.Router();

import {
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getAllFriendRequests,
  getFriendSuggestions
} from '../controllers/friends.controller.js';

friendsRouter.get('/', getAllFriends);
friendsRouter.get('/requests', getAllFriendRequests);
friendsRouter.get('/suggestions', getFriendSuggestions);
friendsRouter.post('/add', sendFriendRequest);
friendsRouter.post('/accept', acceptFriendRequest);
friendsRouter.post('/reject', rejectFriendRequest);
friendsRouter.post('/remove', removeFriend);

export default friendsRouter;
