import dotenv from 'dotenv';

import app from './src/app.js';

dotenv.config();
const { PORT } = process.env;

app.get('/ping', (req, res) => {
  res.status(200);
  res.end('Server is running and can respond to requests!');
});

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Requested page/resource not found!'
  });
});

app.listen(PORT, () => {
  console.log(`****** Server is listening on port ${PORT} ******`);
});
