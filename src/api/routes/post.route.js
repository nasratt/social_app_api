import express from 'express';

import {
  createPost,
  getUserPost,
  updateUserPost
} from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.post('/', createPost);
postRouter.get('/:id', getUserPost);
postRouter.put('/:id', updateUserPost);

export default postRouter;
