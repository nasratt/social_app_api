const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');
const { notifyFriends } = require('../notifications');

const likePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (!(await post.isUserAllowedToView(userId)))
    throw new APIError(403, 'You are not allowed to like the post');

  if (post.likes.includes(userId))
    throw new APIError(403, 'You have already liked the post');
  post.likes.addToSet(userId);
  await post.save();

  const user = await User.findById(userId).exec();
  const postAuthor = await User.findById(post.authorId).exec();

  // function producing notification
  const getLikeNotification = (friend) => {
    const likedBy = `${user.fname} ${user.lname}`;
    let postOf = 'your';
    if (friend._id.toString() === postAuthor._id.toString())
      postOf = `${postAuthor.fname} ${postAuthor.lname}'s`;

    return {
      subject: `New Like`,
      message: `Your friend ${likedBy} has liked ${postOf} post, use following ID to view it`,
      id: `${postId}`
    };
  };

  await notifyFriends(user.friends, getLikeNotification);
};

module.exports = likePost;
