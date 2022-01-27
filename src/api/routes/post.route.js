import express from 'express';

import { createPost, getUserPost } from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.post('/', createPost);
postRouter.get('/:id', getUserPost);

export default postRouter;
