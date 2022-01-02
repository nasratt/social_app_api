import User from '../models/user.model.js';
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
  User.findOne({ email, verified: true }).exec((err, user) => {
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
        message: 'An account already exists with given email'
      });
      return;
    }
    next();
  });
};

export { checkDuplicateEmail, validateSignupBody };
