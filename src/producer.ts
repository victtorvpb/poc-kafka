import { Kafka } from 'kafkajs';

const sendMessage = async (number: number) => {
  var kafka = new Kafka({
    brokers: ['127.0.0.1:9092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'topic1',
    messages: [{ value: 'send message: ' + number, key: number.toString() }],
  });
  await producer.disconnect();
};

for (let index = 30; index < 300; index++) {
  sendMessage(index);
}
