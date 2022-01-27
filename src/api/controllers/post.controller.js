import APIError from '../helpers/apiError.js';
import catchErrors from '../helpers/catchErrors.js';
import { postSchema } from '../validations/validationSchema.js';
import {
  addPost,
  getPost,
  updatePost,
  deletePost
} from '../services/posts/index.js';

const createPost = catchErrors(async (req, res) => {
  const { tokenData, ...postData } = req.body;
  const validationResult = postSchema.validate(postData);

  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  const newPost = await addPost(tokenData.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Your post was successfully added',
    data: { post: newPost }
  });
});

const getUserPost = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData } = req.body;

  const post = await getPost(tokenData.id, postId);

  res.status(200).json({
    success: true,
    message: 'Post was successfully fetched',
    data: { post }
  });
});

const updateUserPost = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData, ...updateData } = req.body;

  const updatedPost = await updatePost(tokenData.id, postId, updateData);

  res.status(200).json({
    success: true,
    message: 'Post was successfully fetched',
    data: { updatedPost }
  });
});

const deleteUserPost = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData } = req.body;

  await deletePost(tokenData.id, postId);
  res.status(200).json({
    success: true,
    message: 'Post was successfully deleted'
  });
});

const likeUserPost = catchErrors(async (req, res) => {});

const dislikeUserPost = catchErrors(async (req, res) => {});

export {
  createPost,
  getUserPost,
  updateUserPost,
  deleteUserPost,
  likeUserPost,
  dislikeUserPost
};
