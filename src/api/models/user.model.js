import mongoose from 'mongoose';
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
    verified: { type: Boolean, default: false },
    friends: { type: [ObjectId], default: [] },
    inRequests: { type: [ObjectId], default: [] },
    outRequests: { type: [ObjectId], default: [] },
    posts: { type: [ObjectId], default: [] }
  },
  options
);

const User = mongoose.model('User', userSchema);
export default User;
