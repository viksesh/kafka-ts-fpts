import { Kafka } from 'kafkajs';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

// Configure the Kafka client
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9094']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

/**
 * A sample function that processes a message.
 * Here we simply transform the message to uppercase.
 * Wrapped in a TaskEither for functional error handling.
 *
 * @param message The input message string.
 */
const processMessage = (message: string): TaskEither<Error, string> =>
  tryCatch(
    async () => {
      // Simulate asynchronous processing
      return message.toUpperCase();
    },
    (reason) => new Error(String(reason))
  );

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const rawMessage = message.value?.toString() ?? '';
      const result = await processMessage(rawMessage)();
      if (result._tag === 'Right') {
        console.log(`Processed message: ${result.right}`);
      } else {
        console.error('Error processing message:', result.left);
      }
    }
  });
};

runConsumer().catch(console.error);
