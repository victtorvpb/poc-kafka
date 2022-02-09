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

const decode = async (message) => {
  return await registry.decode(message);
};

const consumerMessageAvro = async () => {
  const consumer = kafka.consumer({ groupId: 'group-avro' });
  await consumer.connect();

  await consumer.subscribe({ topic: 'topic-avro', fromBeginning: true });
  //   await consumer.seek({ topic: 'topic-avro', partition: 0, offset: '0' });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.info({
        key: message.key?.toString('utf8'),
        value: await decode(message.value),
        headers: message.headers,
        partition: partition,
        offset: message.offset,
        date: new Date(),
      });
    },
  });
};
consumerMessageAvro();
