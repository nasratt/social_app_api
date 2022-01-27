import mongoose from 'mongoose';

import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const addPost = async (userId, post) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const newPost = new Post(post);
  newPost.authorId = userId;

  const doc = await newPost.save();

  const user = await User.findById(userId).exec();
  user.posts.push(doc._id);
  await user.save();
  return doc;
};

export default addPost;
