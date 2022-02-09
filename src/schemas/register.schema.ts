import {
  SchemaRegistry,
  readAVSCAsync,
  SchemaType,
} from '@kafkajs/confluent-schema-registry';

const registry = new SchemaRegistry({ host: 'http://0.0.0.0:8081' });

const registrySchema = async () => {
  const schema = await readAVSCAsync('./src/schemas/topicAvro.avsc');
  console.log(schema);
  const { id } = await registry.register({
    type: SchemaType.AVRO,
    schema: JSON.stringify(schema),
  });
};

registrySchema();
