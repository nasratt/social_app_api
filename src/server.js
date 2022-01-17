import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/dbConnect.js';
import userRouter from './api/routes/user.route.js';
import friendsRouter from './api/routes/friends.route.js';

// ****** Basic Setup *******
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 8000;

connectDB();

// ****** Routes *******
app.use('/users', userRouter);
app.use('/friends', friendsRouter);
app.get('/ping', (req, res) => {
  res.status(200);
  res.end('Server is running and can respond to requests!');
});

app.all('*', (req, res) => {
  res.status(404);
  res.end('Page not found!');
});

app.listen(PORT, () => {
  console.log(`****** Server listening on port ${PORT} ******`);
});
