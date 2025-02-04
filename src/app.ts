import express from 'express';
import createServer from './config/express';
import { ENV } from './config/env';
import { connectDB } from './config/database';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import { setupSwagger } from './config/swagger';

const app = createServer();

connectDB();

setupSwagger(app);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
	res.status(404).json({ error: 'Method not found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal server error' });
});

app.listen(ENV.PORT, () => {
	console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
