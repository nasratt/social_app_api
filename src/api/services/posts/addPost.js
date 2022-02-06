const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');
const { notifyFriends } = require('../notifications');

const addPost = async (userId, post) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const newPost = new Post(post);
  newPost.authorId = userId;

  const doc = await newPost.save();

  const user = await User.findById(userId).exec();
  user.posts.push(doc._id);
  await user.save();

  const generateNotification = () => {
    return {
      subject: 'New Post',
      message: `Your friend ${user.fname} ${user.lname} added a new post, use the following ID to view it`,
      id: `${doc._id}`
    };
  };

  await notifyFriends(user.friends, generateNotification);
  return doc;
};

module.exports = addPost;
