const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const APIError = require('../helpers/apiError');
const { signupSchema } = require('../validations/validationSchema');

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

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const token = authorization.split(' ')[1];

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) throw new APIError(400, 'Invalid token provided');

    req.body.tokenData = decodedToken;
    next();
  } catch (err) {
    res.status(err.statusCode || 500);
    res.json({ success: false, message: err.message });
  }
};

const verifyLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      throw new APIError(400, 'Login credentials not provided');

    const user = await User.findOne({ email }).exec();
    if (!user) throw new APIError(400, 'Invalid email provided');

    if (!user.verified)
      throw new APIError(
        409,
        'Your email is not verified, login is not allowed'
      );

    const isValid = await bcrypt.compare(password, user.hash);
    if (!isValid) throw new APIError(400, 'Invalid password provided');

    req.body.user = user.toObject();

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  checkDuplicateEmail,
  validateSignupBody,
  verifyDecodeJWT,
  verifyLoginCredentials,
  verifyToken
};
