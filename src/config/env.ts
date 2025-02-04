import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
	NODE_ENV: process.env.NODE_ENV || 'dev',
	PORT: process.env.PORT || 5000,
	JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/mydatabase',
};
