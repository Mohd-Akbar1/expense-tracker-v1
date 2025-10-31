import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI ='mongodb://localhost:27017/expense-tracker-v1';


async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
    });
   
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
export default connectDB;