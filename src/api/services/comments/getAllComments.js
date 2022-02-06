const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const Post = require('../../models/post.model');
const APIError = require('../../helpers/apiError');

const { ObjectId } = mongoose.Types;

const getAllComments = async (userId, postId, page = 1, limit = 20) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();

  if (!(await post.isUserAllowedToView(userId)))
    throw new APIError(403, 'You are not allowed to view the comments');

  const offset = limit * (page - 1);
  const comments = await Comment.aggregate([
    {
      $match: { postId: ObjectId(postId) }
    },
    {
      $skip: offset
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'Comments',
        localField: '_id',
        foreignField: 'commentId',
        as: 'replies'
      }
    }
  ]);
  return comments;
};

module.exports = getAllComments;
