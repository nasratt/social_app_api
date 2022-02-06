const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const Post = require('../../models/post.model');
const User = require('../../models/user.model');
const APIError = require('../../helpers/apiError');
const { notifyFriends } = require('../notifications');
const { commentSchema } = require('../../validations/validationSchema');

const addComment = async (userId, postId, comment) => {
  const validationResult = commentSchema.validate(comment);
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  if (!mongoose.isValidObjectId(postId))
    throw new APIError(400, 'Invalid post ID provided');

  const post = await Post.findById(postId).exec();
  if (!(await post.isUserAllowedToView(userId)))
    throw new APIError(403, 'You are not allowed to comment on the post');

  const newComment = new Comment({
    body: comment.body,
    authorId: userId,
    postId
  });

  const addedComment = await newComment.save();

  const user = await User.findById(userId).exec();
  const postAuthor = await User.findOne({ posts: { $eq: postId } }).exec();

  // function producing notification
  const getCommentNotification = (friend) => {
    const likedBy = `${user.fname} ${user.lname}`;
    let postOf = 'your';
    if (friend._id.toString() !== postAuthor._id.toString())
      postOf = `${postAuthor.fname} ${postAuthor.lname}'s`;

    return {
      subject: `New Comment`,
      message: `Your friend ${likedBy} has commented on ${postOf} post, use following IDs to view the comment`,
      id: `Post ID: ${postId} Comment ID: ${addedComment._id}`
    };
  };

  await notifyFriends(user.friends, getCommentNotification);
  return addedComment;
};

module.exports = addComment;
