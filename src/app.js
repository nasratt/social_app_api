import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/dbConnect.js';
import userRouter from './api/routes/user.route.js';
import friendsRouter from './api/routes/friends.route.js';
import { verifyDecodeBearerToken } from './api/middlewares/user.middleware.js';

// ****** Basic Setup *******
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 8000;

// Connecting to DB
connectDB();

// ****** Routes *******
app.use('/users', userRouter);

app.use('/friends', verifyDecodeBearerToken);
app.use('/friends', friendsRouter);

export default app;
