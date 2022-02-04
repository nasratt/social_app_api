import express from 'express';

import {
  signupUser,
  verifyEmail,
  loginUser,
  sendUserData,
  updateUser,
  findUsers,
  resetPassword,
  sendPasswordResetLink,
  changeProfileVisibility
} from '../controllers/user.controller.js';
import {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyDecodeBearerToken
} from '../middlewares/user.middleware.js';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  [validateSignupBody, checkDuplicateEmail],
  signupUser
);
userRouter.get('/verify-email', verifyDecodeJWT, verifyEmail);
userRouter.post('/login', verifyLoginCredentials, loginUser);
userRouter.get('/search', verifyDecodeBearerToken, findUsers);
userRouter.post('/forgot-password', sendPasswordResetLink);
userRouter.post('/reset-password', resetPassword);
userRouter.get(
  '/profile-visibility',
  verifyDecodeBearerToken,
  changeProfileVisibility
);
userRouter.get('/:id', verifyDecodeBearerToken, sendUserData);
userRouter.put('/:id', verifyDecodeBearerToken, updateUser);

export default userRouter;
