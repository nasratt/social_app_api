import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const getPost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString() !== userId) {
    const postAuthor = await User.findById(post.authorId).exec();

    if (
      post.visibility === 'public' ||
      (post.visibility === 'friends' && postAuthor.friends.includes(userId))
    ) {
      return post;
    }
    throw new APIError(403, 'You are not allowed to view the post');
  }
  return post;
};

export default getPost;
