import amqp from 'amqplib';

let connection: amqp.Connection;
let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
    channel = await connection.createChannel();
    
    await channel.assertQueue('enrollment_requests', { durable: true });
    await channel.assertQueue('enrollment_status', { durable: true });
    
    console.log('✅ RabbitMQ connected');
  } catch (error) {
    console.error('❌ RabbitMQ connection failed:', error);
    process.exit(1);
  }
};

export const getChannel = () => channel;
export const getConnection = () => connection;