import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import APIError from '../../helpers/apiError.js';
import { postSchema } from '../../validations/validationSchema.js';

const updatePost = async (userId, postId, updateData) => {
  // adding update for conditional schema
  const validationResult = postSchema.validate({ ...updateData, update: true });
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString() !== userId)
    throw new APIError(403, 'You are not allowed to update the post');

  Object.keys(updateData).forEach((el) => {
    post[el] = updateData[el];
  });

  const updatedPost = await post.save();

  return updatedPost;
};

export default updatePost;
