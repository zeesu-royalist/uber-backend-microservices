const amqp = require('amqplib');

let connection = null;
let channel = null;

const RABBIT_URL = process.env.RABBIT_URL || process.env.RABBIT_URL_FROM_cloudAMQP || 'amqp://localhost';

async function connectRabbit() {
  if (!connection) {
    connection = await amqp.connect(RABBIT_URL);
    console.log('RabbitMQ connected successfully');
    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
      connection = null;
      channel = null;
    });
  }

  return connection;
}

async function getChannel() {
  if (!channel) {
    const conn = await connectRabbit();
    channel = await conn.createChannel();
  }

  return channel;
}

async function publishtoQueu(queueName, message) {
  try {
    const ch = await getChannel();
    await ch.assertQueue(queueName, { durable: true });

    const payload = Buffer.isBuffer(message)
      ? message
      : Buffer.from(JSON.stringify(message));

    ch.sendToQueue(queueName, payload, { persistent: true });
    console.log(`Message published to queue: ${queueName}`);
  } catch (error) {
    console.error('Error publishing to queue:', error.message);
    throw error;
  }
}

async function subscribeTOQeue(queueName, callback) {
  try {
    const ch = await getChannel();
    await ch.assertQueue(queueName, { durable: true });

    ch.consume(queueName, async (msg) => {
      if (!msg) return;

      try {
        const content = msg.content.toString();
        const data = JSON.parse(content);

        if (typeof callback === 'function') {
          await callback(data, msg);
        }

        ch.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error.message);
        ch.nack(msg, false, false);
      }
    }, { noAck: false });

    console.log(`Subscribed to queue: ${queueName}`);
  } catch (error) {
    console.error('Error subscribing to queue:', error.message);
    throw error;
  }
}

module.exports = {
  publishtoQueu,
  subscribeTOQeue,
  connectRabbit
};
