import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import APIError from '../../helpers/apiError.js';

const getPost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId, { __v: false }).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (await post.isUserAllowedToView(userId)) {
    return post;
  }
  throw new APIError(403, 'You are not allowed to view the post');
};

export default getPost;
