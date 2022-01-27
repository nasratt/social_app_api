import User from '../../models/user.model.js';

const verifyUserEmail = async (id) => {
  const user = await User.findById(id);
  user.verified = true;
  await user.save();
};

export default verifyUserEmail;
