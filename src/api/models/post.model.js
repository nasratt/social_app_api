import mongoose from 'mongoose';

import User from './user.model.js';

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    body: { type: String, required: true, maxlength: 1000 },
    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    visibility: {
      type: String,
      default: 'public',
      enum: ['public', 'friends', 'me']
    },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    likes: { type: [ObjectId], required: true, default: [], ref: 'User' },
    authorId: { type: ObjectId, required: true, ref: 'User' }
  },
  { minimize: false, timestamps: true }
);

postSchema.methods.isUserAllowedToView = async function (userId) {
  const postAuthor = await User.findById(this.authorId).exec();

  if (this.authorId.toString() === userId) return true;
  return (
    this.visibility === 'public' ||
    (this.visibility === 'friends' && postAuthor.friends.includes(userId))
  );
};

const Post = model('Post', postSchema);
export default Post;
