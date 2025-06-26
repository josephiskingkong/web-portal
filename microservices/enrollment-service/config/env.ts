import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.ENROLLMENT_SERVICE_PORT || 3003,
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  MONGO_URI: process.env.ENROLLMENT_MONGO_URI || 'mongodb://mongo-enrollment:27017/enrollmentdb'
};