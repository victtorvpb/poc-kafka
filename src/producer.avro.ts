import { Kafka } from 'kafkajs';

import {
  SchemaRegistry,
  readAVSCAsync,
  SchemaType,
} from '@kafkajs/confluent-schema-registry';

const kafka = new Kafka({
  brokers: ['127.0.0.1:9092'],
});

const subject = 'topicAvro.teste';
const version = 1;
const registry = new SchemaRegistry({ host: 'http://0.0.0.0:8081/' });
const SchemaId = async () => {
  return registry.getRegistryId(subject, version);
};

const encode = async (message) => {
  let schemaId = await SchemaId();
  return await registry.encode(schemaId, message);
};

const sendMessage = async () => {
  var messages = await genarateMessages();
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'topic-avro',
    messages: messages,
  });
  await producer.disconnect();
};

const genarateMessages = async () => {
  let messages = [];
  for (let index = 30; index < 300; index++) {
    let message = { customer_id: index, description: 'name' + index };
    let encodedMessage = await encode(message);

    messages.push({ value: encodedMessage });
  }
  return messages;
};

sendMessage();
