const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

const connectDB = require('./config/dbConnect');
const userRouter = require('./api/routes/user.route');
const friendsRouter = require('./api/routes/friends.route');
const postRouter = require('./api/routes/post.route');
const { verifyToken } = require('./api/middlewares/user.middleware');

// ****** Basic Setup *******
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Image upload proxy
const { IMG_UPLOAD_URL } = process.env;
const imageProxy = createProxyMiddleware('/', { target: IMG_UPLOAD_URL });
// Connecting to DB
connectDB();

// ****** Routes *******
app.use('/users', userRouter);

app.use('/friends', verifyToken);
app.use('/friends', friendsRouter);

app.use('/posts', verifyToken);
app.use('/posts', postRouter);

app.use('/images', verifyToken);
app.use('/images', imageProxy);

module.exports = app;
