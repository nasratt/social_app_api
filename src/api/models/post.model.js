import mongoose from 'mongoose';

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

const Post = model('Post', postSchema);
export default Post;
