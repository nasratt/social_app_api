import express from 'express';

import {
  createPost,
  getUserPost,
  updateUserPost,
  deleteUserPost,
  likeUserPost,
  dislikeUserPost,
  getUserAllPosts
} from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.get('/', getUserAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getUserPost);
postRouter.put('/:id', updateUserPost);
postRouter.delete('/:id', deleteUserPost);
postRouter.post('/:id/like', likeUserPost);
postRouter.post('/:id/dislike', dislikeUserPost);

export default postRouter;
