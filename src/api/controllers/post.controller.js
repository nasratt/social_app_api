import APIError from '../helpers/apiError.js';
import catchErrors from '../helpers/catchErrors.js';
import {
  postSchema,
  pageLimitSchema
} from '../validations/validationSchema.js';
import {
  addPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getAllPosts
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

const likeUserPost = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData } = req.body;

  await likePost(tokenData.id, postId);
  res.status(200).json({
    success: true,
    message: 'You have successfully liked the post'
  });
});

const dislikeUserPost = catchErrors(async (req, res) => {
  const { id: postId } = req.params;
  const { tokenData } = req.body;

  await dislikePost(tokenData.id, postId);
  res.status(200).json({
    success: true,
    message: 'You have successfully disliked the post'
  });
});

const getUserAllPosts = catchErrors(async (req, res) => {
  const { tokenData } = req.body;
  const { page, limit } = req.query;
  const validationResult = pageLimitSchema.validate({ page, limit });
  if (validationResult.error)
    throw new APIError(400, validationResult.error.details[0].message);

  const posts = await getAllPosts(tokenData.id, +page || 1, +limit || 20);
  res.status(200).json({
    success: true,
    message: 'Posts were successfully fetched',
    data: { posts }
  });
});

export {
  createPost,
  getUserPost,
  updateUserPost,
  deleteUserPost,
  likeUserPost,
  dislikeUserPost,
  getUserAllPosts
};
