const sendVerificationEmail = require('./sendVerificationEmail');
const verifyUserEmail = require('./verifyUserEmail');
const getUserData = require('./getUserData');
const updateUserData = require('./updateUserData');
const fetchUsersData = require('./fetchUsersData');
const sendPasswordResetEmail = require('./sendPasswordResetEmail');
const resetUserPassword = require('./resetUserPassword');
const setProfileVisibility = require('./setProfileVisibility');

module.exports = {
  sendPasswordResetEmail,
  sendVerificationEmail,
  verifyUserEmail,
  getUserData,
  updateUserData,
  fetchUsersData,
  resetUserPassword,
  setProfileVisibility
};
