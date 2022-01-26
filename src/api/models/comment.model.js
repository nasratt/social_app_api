import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const commentSchema = new Schema(
  {
    body: { type: String, required: true, maxlength: 500 },
    authorId: { type: ObjectId, required: true, ref: 'User' },
    postId: { type: ObjectId, required: true, ref: 'Post' },
    commentId: { type: ObjectId, ref: 'Comment' }
  },
  { minimize: false, timestamps: true }
);

const Comment = model('Comment', commentSchema);
export default Comment;
