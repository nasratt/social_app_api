import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import sendVerificationEmail from '../helpers/sendVerificationEmail.js';

const signup = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 8);

    const newUser = new User({
      fname,
      lname,
      email,
      hash
    });

    const resNewUser = await newUser.save();

    const vEmail = sendVerificationEmail(
      'Socail App API',
      'Email verification',
      resNewUser
    );

    res.status(201).json({
      success: true,
      message:
        'you have successfully signed up, please visit your email to verify your email',
      data: { id: resNewUser._id }
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export { signup };
