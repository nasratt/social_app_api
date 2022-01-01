import User from '../models/user.js';

const createUser = async (userData) => {
  const newUser = new User(userData);
  try {
    const res = await newUser.save();
    // res.status(201).json(newUser);
  } catch (error) {
    // res.status(409).json({ message: err.message });
  }
};

export default createUser;
