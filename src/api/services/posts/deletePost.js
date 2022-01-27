import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import Comment from '../../models/comment.model.js';
import APIError from '../../helpers/apiError.js';

const deletePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString() !== userId)
    throw new APIError(403, 'You are not allowed to delete post');

  await Post.deleteOne({ _id: postId });
  await Comment.deleteMany({ postId });
};

export default deletePost;
