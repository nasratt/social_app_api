import express from 'express';

import { signup } from '../controllers/user.controller.js';
import {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT
} from '../middlewares/userMiddlewares.js';
import verifyUserEmail from '../services/verifyUserEmail.js';

const userRouter = express.Router();

userRouter.post('/signup', [validateSignupBody, checkDuplicateEmail], signup);
userRouter.get('/verify_email', verifyDecodeJWT, async (req, res) => {
  try {
    await verifyUserEmail(req.body.id);
    res
      .status(200)
      .json({ success: true, message: 'your email was verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default userRouter;
