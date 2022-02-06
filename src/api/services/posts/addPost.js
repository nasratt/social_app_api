const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');

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

module.exports = addPost;
