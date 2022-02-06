const express = require('express');

const {
  createPostComment,
  getPostComment,
  updatePostComment,
  deletePostComment,
  getPostAllComments
} = require('../controllers/comment.controller');

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get('/', getPostAllComments);

commentRouter.post('/', createPostComment);

commentRouter.get('/:cid', getPostComment);

commentRouter.put('/:cid', updatePostComment);

commentRouter.delete('/:cid', deletePostComment);

module.exports = commentRouter;
