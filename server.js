import dotenv from 'dotenv';

import app from './src/app.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

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

app.use((err, req, res, next) => {
  const code = err.statusCode || 500;
  console.log(code, err.message);
  res.status(code).json({
    success: false,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`****** Server is listening on port ${PORT} ******`);
});
