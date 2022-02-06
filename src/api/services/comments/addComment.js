const mongoose = require('mongoose');

const Comment = require('../../models/comment.model');
const Post = require('../../models/post.model');
const APIError = require('../../helpers/apiError');
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
  if (await post.isUserAllowedToView(userId)) {
    const newComment = new Comment({
      body: comment.body,
      authorId: userId,
      postId
    });

    const doc = await newComment.save();
    return doc;
  }
  throw new APIError(403, 'You are not allowed to comment on the post');
};

module.exports = addComment;
