const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const APIError = require('../../helpers/apiError');

const deleteComment = async (userId, postId, commentId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  if (!mongoose.isValidObjectId(commentId))
    throw new APIError(400, 'Invalid comment ID provided');

  const comment = await Comment.findById(commentId).exec();
  if (comment.authorId.toString() !== userId)
    throw new APIError(403, 'You are not allowed to edit the comment');
  await comment.deleteOne();
  await Comment.deleteMany({ commentId });
};

module.exports = deleteComment;
