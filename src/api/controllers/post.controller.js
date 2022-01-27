import APIError from '../helpers/apiError.js';
import catchErrors from '../helpers/catchErrors.js';
import { postSchema } from '../validations/validationSchema.js';
import { addPost } from '../services/posts/index.js';

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

const getUserPost = catchErrors(async (req, res) => {});

export { createPost, getUserPost };
