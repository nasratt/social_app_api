const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const options = {
  minimize: false,
  timestamps: true
};
/* inRequests: friend requests coming to user
 * outRequests: friend requests user has sent to others
 */
const userSchema = new Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    hash: String,
    profilePic: { type: String, default: '' },
    visibility: {
      type: String,
      default: 'public',
      enum: ['public', 'private']
    },
    verified: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    friends: { type: [ObjectId], default: [], ref: 'User' },
    inRequests: { type: [ObjectId], default: [], ref: 'User' },
    outRequests: { type: [ObjectId], default: [], ref: 'User' },
    blocked: { type: [ObjectId], default: [], ref: 'User' },
    posts: { type: [ObjectId], default: [], ref: 'Posts' }
  },
  options
);

const User = mongoose.model('User', userSchema);
module.exports = User;
