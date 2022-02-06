const express = require('express');

const {
  createPost,
  getUserPost,
  updateUserPost,
  deleteUserPost,
  likeUserPost,
  dislikeUserPost,
  getUserAllPosts,
  shareUserPost
} = require('../controllers/post.controller');
const commentRouter = require('./comment.route');

const postRouter = express.Router();

postRouter.get('/', getUserAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getUserPost);
postRouter.put('/:id', updateUserPost);
postRouter.delete('/:id', deleteUserPost);
postRouter.post('/:id/like', likeUserPost);
postRouter.post('/:id/dislike', dislikeUserPost);
postRouter.post('/:id/share', shareUserPost);

postRouter.use('/:id/comments', commentRouter);

module.exports = postRouter;
