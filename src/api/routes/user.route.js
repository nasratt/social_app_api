import express from 'express';

import { signup } from '../controllers/user.controller.js';
import {
  checkDuplicateEmail,
  validateSignupBody
} from '../middlewares/validateSignup.js';

const userRouter = express.Router();

userRouter.post('/signup', [validateSignupBody, checkDuplicateEmail], signup);

export default userRouter;
