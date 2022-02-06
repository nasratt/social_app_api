const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const APIError = require('../../helpers/apiError');

const dislikePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (await post.isUserAllowedToView(userId)) {
    if (!post.likes.includes(userId))
      throw new APIError(403, 'You have not liked the post');
    post.likes.pull(userId);
    await post.save();
  }
  throw new APIError(403, 'You are not allowed to dislike the post');
};

module.exports = dislikePost;
