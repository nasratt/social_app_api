import express from 'express';

const friendsRouter = express.Router();

import {
  getAllFriends,
  sendFriendRequest
} from '../controllers/friends.controller.js';

friendsRouter.get('/', getAllFriends);
friendsRouter.get('/requests', () => {});
friendsRouter.get('/suggestions', () => {});
friendsRouter.post('/add', sendFriendRequest);
friendsRouter.post('/accept', () => {});
friendsRouter.post('/reject', () => {});
friendsRouter.post('/remove', () => {});

export default friendsRouter;
