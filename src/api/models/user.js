import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const userSchema = new Schema(
  {
    fname: String,
    lname: String,
    email: String,
    pass_hash: String,
    profile_pic: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    friends: { type: [ObjectId], default: [] },
    posts: { type: [ObjectId], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  { minimize: false, collection: 'user' }
);

const User = mongoose.model('user', userSchema);
export default User;
