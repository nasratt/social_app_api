import express from 'express';

import {
  signup,
  verifyEmail,
  logUserIn,
  sendUserData
} from '../controllers/user.controller.js';
import {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyDecodeBearerToken
} from '../middlewares/userMiddlewares.js';

const userRouter = express.Router();

userRouter.post('/signup', [validateSignupBody, checkDuplicateEmail], signup);
userRouter.get('/verify_email', verifyDecodeJWT, verifyEmail);
userRouter.post('/login', verifyLoginCredentials, logUserIn);
userRouter.get('/:id', verifyDecodeBearerToken, sendUserData);

export default userRouter;
