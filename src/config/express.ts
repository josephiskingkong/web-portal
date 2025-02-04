import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './env';

const createServer = () => {
	const app = express();

	app.use(
		helmet({
		  contentSecurityPolicy: {
			directives: {
			  defaultSrc: ["'self'"],
			  scriptSrc: ["'self'", "'unsafe-inline'"],
			  styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
			  imgSrc: ["'self'", "data:"],
			  connectSrc: ["'self'", `http://localhost:${ENV.PORT}`], 
			},
		  },
		})
	  );
	app.use(cors());
	app.use(morgan(ENV.NODE_ENV === 'production' ? 'combined' : 'dev'));

	app.use(express.json());

	return app;
};

export default createServer;
