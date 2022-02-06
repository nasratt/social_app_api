const User = require('../../models/user.model');

const verifyUserEmail = async (id) => {
  const user = await User.findById(id);
  user.verified = true;
  await user.save();
};

module.exports = verifyUserEmail;
