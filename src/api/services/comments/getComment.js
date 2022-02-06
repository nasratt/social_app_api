const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const Post = require('../../models/post.model');
const APIError = require('../../helpers/apiError');

const getComment = async (userId, postId, commentId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  if (!mongoose.isValidObjectId(commentId))
    throw new APIError(400, 'Invalid comment ID provided');

  const post = await Post.findById(postId).exec();
  if (await post.isUserAllowedToView(userId)) {
    const comment = await Comment.findById(commentId, { __v: false }).exec();
    const replies = await Comment.find(
      { commentId },
      { __v: false, commentId: false }
    ).exec();
    return { ...comment.toObject(), replies };
  }
  throw new APIError(403, 'You are not allowed to view the comment');
};

module.exports = getComment;
