import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const sharePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString === userId)
    throw new APIError(403, 'You can not share your own post');

  if (await post.isUserAllowedToView(userId)) {
    const user = await User.findById(userId).exec();
    user.posts.push(post._id);
    await user.save();
    return post;
  }
  throw new APIError(403, 'You are not allowed to share the post');
};

export default sharePost;
