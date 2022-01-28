import express from 'express';

import {
  createPostComment,
  getPostComment,
  updatePostComment,
  deletePostComment,
  getPostAllComments
} from '../controllers/comment.controller.js';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', getPostAllComments);

commentRouter.post('/', createPostComment);

commentRouter.get('/:cid', getPostComment);

commentRouter.put('/:cid', updatePostComment);

commentRouter.delete('/:cid', deletePostComment);

export default commentRouter;
