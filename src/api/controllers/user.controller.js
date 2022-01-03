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

    const vEmail = await sendVerificationEmail(
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

const verifyEmail = async (req, res) => {
  try {
    await verifyUserEmail(req.body.id);
    res
      .status(200)
      .json({ success: true, message: 'your email was verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const logUserIn = (req, res) => {};

export { signup, verifyEmail, logUserIn };
