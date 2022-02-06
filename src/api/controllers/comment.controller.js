const catchErrors = require('../helpers/catchErrors');
const { pageLimitSchema } = require('../validations/validationSchema');
const {
  addComment,
  getComment,
  updateComment,
  deleteComment,
  getAllComments
} = require('../services/comments');
const APIError = require('../helpers/apiError');

const createPostComment = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData, ...commentData } = req.body;

  const newComment = await addComment(tokenData.id, postId, commentData);
  res.status(201).json({
    success: true,
    message: 'Your comment was successfully added',
    data: { comment: newComment }
  });
});

const getPostComment = catchErrors(async (req, res) => {
  const { id: postId, cid: commentId } = req.params;
  const { tokenData } = req.body;

  const comment = await getComment(tokenData.id, postId, commentId);
  res.status(200).json({
    success: true,
    message: 'The comment was successfully fetched',
    data: { comment }
  });
});

const updatePostComment = catchErrors(async (req, res) => {
  const { id: postId, cid: commentId } = req.params;
  const { tokenData, ...commentData } = req.body;

  const comment = await updateComment(
    tokenData.id,
    postId,
    commentId,
    commentData
  );
  res.status(200).json({
    success: true,
    message: 'The comment was successfully updated',
    data: { comment }
  });
});

const deletePostComment = catchErrors(async (req, res) => {
  const { id: postId, cid: commentId } = req.params;
  const { tokenData } = req.body;
  await deleteComment(tokenData.id, postId, commentId);

  res.status(200).json({
    success: true,
    message: 'The comment was successfully deleted'
  });
});

const getPostAllComments = catchErrors(async (req, res) => {
  const { page, limit } = req.query;
  const { tokenData } = req.body;
  const { id: postId } = req.params;

  const validationResult = pageLimitSchema.validate({ page, limit });
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  const comments = await getAllComments(
    tokenData.id,
    postId,
    +page || 1,
    +limit || 20
  );
  res.status(200).json({
    success: true,
    message: 'Comments were successfully fetched',
    data: { comments }
  });
});

module.exports = {
  createPostComment,
  getPostComment,
  updatePostComment,
  deletePostComment,
  getPostAllComments
};
