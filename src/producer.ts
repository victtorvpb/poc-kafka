import { Kafka } from 'kafkajs';

const sendMessage = async (messages: any) => {
  var kafka = new Kafka({
    brokers: ['127.0.0.1:9092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'topic1',
    messages: messages,
  });
  await producer.disconnect();
};

let messages = [];
for (let index = 30; index < 300; index++) {
  messages.push({
    value: 'send message: ' + index,
    key: index.toString(),
  });
}
sendMessage(messages);
