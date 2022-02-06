const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const Comment = require('../../models/comment.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');

const deletePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString() !== userId)
    throw new APIError(403, 'You are not allowed to delete post');

  const user = await User.findById(userId).exec();
  user.posts.pull(postId);
  await user.save();

  await Post.deleteOne({ _id: postId });
  await Comment.deleteMany({ postId });
};

module.exports = deletePost;
