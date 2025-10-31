import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/dbconnection.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('api is running!');
});

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});