import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import {
  signupSchema,
  resetPassSchema,
  userUpdateSchema
} from '../validations/validationSchema.js';
import APIError from '../helpers/apiError.js';

const validateSignupBody = (req, res, next) => {
  const result = signupSchema.validate(req.body);

  if (result.error) {
    res.status(400).json({
      success: false,
      message: result.error.details[0].message
    });
    return;
  }
  next();
};

const checkDuplicateEmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
      return;
    }

    if (user) {
      res.status(400).json({
        success: false,
        message: 'Someone is already using that email'
      });
      return;
    }
    next();
  });
};

const verifyDecodeJWT = async (req, res, next) => {
  const token = req.query.secret;
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.body.id = decodedToken.id;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifyDecodeBearerToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const [_, token] = authorization.split(' ');

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      throw new Error({ type: invalid, message: 'Invalid token provided' });

    req.body.tokenData = decodedToken;
    next();
  } catch (err) {
    if (err.type === 'invalid') res.status(400);
    else res.status(500);
    res.json({ success: false, message: err.message });
  }
};

const verifyLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error('Login credentials not provided');

    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('Invalid email provided');

    if (!user.verified)
      throw new Error('Your email is not verified, login is not allowed');

    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) throw new Error('Invalid password provided');

    req.body.user = user.toObject();

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
    return;
  }
};

const validateResetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = resetPassSchema.validate(req.body);

    if (result.error) throw new Error(result.error.details[0].message);

    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('Invalid email provided');

    if (!user.verified)
      throw new Error('Email is not verified, cannot reset password');
    req.body.id = user._id;

    next();
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const validateUpdateBody = (req, res, next) => {
  const { ...updateData } = req.body;
  const result = userUpdateSchema.validate(updateData);
  const errMessage = result?.error?.details[0]?.message;

  if (result.error) next(new APIError(400, errMessage));
  else next();
};

export {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyDecodeBearerToken,
  validateResetPassword,
  validateUpdateBody
};
