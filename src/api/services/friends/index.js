const getUserFriends = require('./getUserFriends');
const sendRequest = require('./sendRequest');
const respondRequest = require('./respondRequest');
const unFriend = require('./unFriend');
const getUserFriendRequests = require('./getUserFriendRequests');
const suggestFriends = require('./suggestFriends');
const block = require('./block');
const unBlock = require('./unBlock');

module.exports = {
  getUserFriendRequests,
  sendRequest,
  getUserFriends,
  respondRequest,
  unFriend,
  unBlock,
  block,
  suggestFriends
};
