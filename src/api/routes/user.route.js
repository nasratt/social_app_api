const express = require('express');

const {
  signupUser,
  verifyEmail,
  loginUser,
  sendUserData,
  updateUser,
  findUsers,
  resetPassword,
  sendPasswordResetLink,
  changeProfileVisibility,
  changeNotificationStatus
} = require('../controllers/user.controller');
const {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyToken
} = require('../middlewares/user.middleware');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  [validateSignupBody, checkDuplicateEmail],
  signupUser
);
userRouter.get('/verify-email', verifyDecodeJWT, verifyEmail);
userRouter.post('/login', verifyLoginCredentials, loginUser);
userRouter.get('/search', verifyToken, findUsers);
userRouter.post('/forgot-password', sendPasswordResetLink);
userRouter.post('/reset-password', resetPassword);
userRouter.patch('/profile-visibility', verifyToken, changeProfileVisibility);
userRouter.patch('/notifications', verifyToken, changeNotificationStatus);
userRouter.get('/:id', verifyToken, sendUserData);
userRouter.put('/:id', verifyToken, updateUser);

module.exports = userRouter;
