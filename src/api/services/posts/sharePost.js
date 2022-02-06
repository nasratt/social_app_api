const mongoose = require('mongoose');

const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');
const { notifyFriends } = require('../notifications');

const sharePost = async (userId, postId) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!post) throw new APIError(404, 'No post was found with given ID');

  if (post.authorId.toString === userId)
    throw new APIError(403, 'You can not share your own post');

  if (!(await post.isUserAllowedToView(userId)))
    throw new APIError(403, 'You are not allowed to share the post');

  const user = await User.findById(userId).exec();
  user.posts.push(post._id);
  await user.save();

  const postAuthor = await User.findById(post.authorId).exec();

  // function producing notification
  const getShareNotification = (friend) => {
    const likedBy = `${user.fname} ${user.lname}`;
    let postOf = 'your';
    if (friend._id.toString() === postAuthor._id.toString())
      postOf = `${postAuthor.fname} ${postAuthor.lname}'s`;

    return {
      subject: `New Share`,
      message: `Your friend ${likedBy} has shared ${postOf} post, use following ID to view it`,
      id: `${postId}`
    };
  };

  await notifyFriends(user.friends, getShareNotification);
  return post;
};

module.exports = sharePost;
