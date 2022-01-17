import express from 'express';

const friendsRouter = express.Router();

import {
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend
} from '../controllers/friends.controller.js';

friendsRouter.get('/', getAllFriends);
friendsRouter.get('/requests', () => {});
friendsRouter.get('/suggestions', () => {});
friendsRouter.post('/add', sendFriendRequest);
friendsRouter.post('/accept', acceptFriendRequest);
friendsRouter.post('/reject', rejectFriendRequest);
friendsRouter.post('/remove', removeFriend);

export default friendsRouter;
