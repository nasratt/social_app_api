import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/dbConnect.js';
import userRouter from './api/routes/user.route.js';
import friendsRouter from './api/routes/friends.route.js';
import postRouter from './api/routes/post.route.js';
import { verifyToken } from './api/middlewares/user.middleware.js';

// ****** Basic Setup *******
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to DB
connectDB();

// ****** Routes *******
app.use('/users', userRouter);

app.use('/friends', verifyToken);
app.use('/friends', friendsRouter);

app.use('/posts', verifyToken);
app.use('/posts', postRouter);

export default app;
