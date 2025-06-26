import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log('✅ Enrollment Service MongoDB connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};