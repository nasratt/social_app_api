import express from 'express';

import {
  signupUser,
  verifyEmail,
  loginUser,
  sendUserData,
  updateUser,
  findUsers,
  resetPassword
} from '../controllers/user.controller.js';
import {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyDecodeBearerToken,
  validateResetPassword,
  validateUpdateBody
} from '../middlewares/user.middleware.js';

const userRouter = express.Router();

// TODO: blocked list should be considered in /search and /:id

userRouter.post(
  '/signup',
  [validateSignupBody, checkDuplicateEmail],
  signupUser
);
userRouter.get('/verify-email', verifyDecodeJWT, verifyEmail);
userRouter.post('/login', verifyLoginCredentials, loginUser);
userRouter.get('/search', verifyDecodeBearerToken, findUsers);
userRouter.post('/forgot-password', validateResetPassword, resetPassword);
userRouter.get('/:id', verifyDecodeBearerToken, sendUserData);
userRouter.put('/:id', validateUpdateBody, verifyDecodeBearerToken, updateUser);

export default userRouter;
