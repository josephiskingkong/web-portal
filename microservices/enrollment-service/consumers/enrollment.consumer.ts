import { getChannel } from '../config/rabbitmq';
import { EnrollmentService } from '../services/enrollment.service';

export const startEnrollmentConsumer = async () => {
  const channel = getChannel();
  
  await channel.consume('enrollment_requests', async (msg) => {
    if (msg) {
      try {
        const enrollmentData = JSON.parse(msg.content.toString());
        await EnrollmentService.processEnrollment(enrollmentData);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing enrollment:', error);
        channel.nack(msg, false, false);
      }
    }
  });

  console.log('Enrollment consumer started');
};