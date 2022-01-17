import express from 'express';

const friendsRouter = express.Router();

import { getAllFriends } from '../controllers/friends.controller.js';
import { verifyDecodeBearerToken } from '../middlewares/user.middleware.js';

friendsRouter.get('/', verifyDecodeBearerToken, getAllFriends);
friendsRouter.get('/requests', () => {});
friendsRouter.get('/suggestions', () => {});
friendsRouter.post('/add', () => {});
friendsRouter.post('/accept', () => {});
friendsRouter.post('/reject', () => {});
friendsRouter.post('/remove', () => {});

export default friendsRouter;
