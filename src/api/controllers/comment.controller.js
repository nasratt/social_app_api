import catchErrors from '../helpers/catchErrors.js';
import { addComment } from '../services/comments/index.js';

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

const getPostComment = catchErrors(async (req, res) => {});

const updatePostComment = catchErrors(async (req, res) => {});

const deletePostComment = catchErrors(async (req, res) => {});

const getPostAllComments = catchErrors(async (req, res) => {});

export {
  createPostComment,
  getPostComment,
  updatePostComment,
  deletePostComment,
  getPostAllComments
};
