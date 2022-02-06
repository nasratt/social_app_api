const addPost = require('./addPost');
const getPost = require('./getPost');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');
const likePost = require('./likePost');
const dislikePost = require('./dislikePost');
const getAllPosts = require('./getAllPosts');
const sharePost = require('./sharePost');

module.exports = {
  addPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getAllPosts,
  sharePost
};
