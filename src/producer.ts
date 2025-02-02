import { Kafka } from 'kafkajs';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9094']
});

const producer = kafka.producer();

/**
 * Produce a message to a Kafka topic in a TaskEither context.
 * @param topic The topic to send the message to.
 * @param message The message to send.
 */
const produceMessage = (topic: string, message: string): TaskEither<Error, void> =>
  tryCatch(
    async () => {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{ value: message }]
      });
      console.log(`Message sent: ${message}`);
      await producer.disconnect();
    },
    (reason) => new Error(String(reason))
  );

// Run the producer
const run = async () => {
  const result = await produceMessage('test-topic', 'Hello, Kafka with fp-ts!')();
  if (result._tag === 'Left') {
    console.error('Error producing message:', result.left);
  } else {
    console.log('Message produced successfully');
  }
};

run();
