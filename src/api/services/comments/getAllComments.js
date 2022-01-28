import mongoose from 'mongoose';

import Comment from '../../models/comment.model.js';
import Post from '../../models/post.model.js';
import APIError from '../../helpers/apiError.js';

const { ObjectId } = mongoose.Types;

const getAllComments = async (userId, postId, page = 1, limit = 20) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (await post.isUserAllowedToView(userId)) {
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
  }
  throw new APIError(403, 'You are not allowed to view the comments');
};

export default getAllComments;
