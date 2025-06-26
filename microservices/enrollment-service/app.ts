import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import { connectDB } from './config/database';
import { connectRabbitMQ } from './config/rabbitmq';
import { startEnrollmentConsumer } from './consumers/enrollment.consumer';
import enrollmentRoutes from './routes/enrollment.routes';
import progressRoutes from './routes/progress.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();
  await startEnrollmentConsumer();

  app.use('/api/enrollments', enrollmentRoutes);
  app.use('/api/progress', progressRoutes);

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Enrollment Service running on port ${ENV.PORT}`);
  });
};

startServer();