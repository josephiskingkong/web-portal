import express from 'express';
import createServer from './config/express';
import { ENV } from './config/env';
import { connectDB } from './config/database';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import storageRoutes from './routes/storage.routes';
import tagRoutes from './routes/tag.routes';

import { setupSwagger } from './config/swagger';

const app = createServer();

connectDB();

setupSwagger(app);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/tags', tagRoutes);

app.use((req, res) => {
	res.status(404).json({ error: 'Method not found' });
});

app.use((err: any, req: express.Request, res: express.Response) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal server error' });
});

app.listen(ENV.PORT, () => {
	console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
