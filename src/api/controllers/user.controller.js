import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

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
    res.status(201).json(resNewUser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export { signup };
