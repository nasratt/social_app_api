const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const APIError = require('../../helpers/apiError');
const { commentSchema } = require('../../validations/validationSchema');

const updateComment = async (userId, postId, commentId, commentData) => {
  const validationResult = commentSchema.validate(commentData);
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  if (!mongoose.isValidObjectId(commentId))
    throw new APIError(400, 'Invalid comment ID provided');

  const comment = await Comment.findById(commentId).exec();
  if (comment.authorId.toString() !== userId)
    throw new APIError(403, 'You are not allowed to edit the comment');

  comment.body = commentData.body;
  const updatedDoc = await comment.save();
  return updatedDoc;
};

module.exports = updateComment;
