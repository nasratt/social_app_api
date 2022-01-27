import Post from '../../models/post.model.js';

const addPost = async (userId, post) => {
  const newPost = new Post(post);
  newPost.authorId = userId;

  const doc = await newPost.save();

  return doc;
};

export default addPost;
