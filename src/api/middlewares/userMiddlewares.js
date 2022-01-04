import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import doesCredentialsMatch from '../services/matchLoginCredentials.js';
import { signupSchema } from '../validations/authValidation.js';

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
        message: 'someone is already using that email'
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
    res.status(400).json({ success: false, message: 'no token provided' });
    return;
  }

  try {
    const [_, token] = authorization.split(' ');

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      throw new Error({ type: invalid, message: 'invalid token provided' });

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
  if (!email || !password)
    res
      .status(400)
      .json({ success: false, message: 'login credentials not provided' });

  const result = await doesCredentialsMatch(email, password);

  if (!result.success) {
    res.status(400).json({ success: result.success, message: result.message });
    return;
  }

  req.body.user = result.user;

  next();
};

export {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyDecodeBearerToken
};
