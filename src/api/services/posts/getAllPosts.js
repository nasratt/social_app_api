const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const APIError = require('../../helpers/apiError');

const getAllPosts = async (userId, page = 1, limit = 20) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const offset = (page - 1) * limit;

  const posts = await Post.find({ authorId: userId })
    .skip(offset)
    .limit(limit)
    .exec();
  if (!posts) throw new APIError(404, 'No post was found with given ID');
  return posts;
};

module.exports = getAllPosts;
