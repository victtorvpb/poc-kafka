import { Kafka } from 'kafkajs';

const consumerMessage = async () => {
  var kafka = new Kafka({
    brokers: ['127.0.0.1:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'group1' });
  await consumer.connect();

  await consumer.subscribe({ topic: 'topic1', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.info({
        key: message.key?.toString('utf8'),
        value: message.value.toString(),
        headers: message.headers,
        partition: partition,
        offset: message.offset,
        date: new Date(),
      });
    },
  });
};

consumerMessage();
