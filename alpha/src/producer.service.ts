import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Admin, Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private kafka = new Kafka({
    brokers: [`${process.env.KAFKA_URL}:${process.env.KAFKA_PORT}`],
  });
  private producer: Producer = this.kafka.producer();
  private admin: Admin = this.kafka.admin();

  async onModuleInit() {
    await this.admin.connect();
    await this.producer.connect();
    await this.admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic: 'info' }],
    });
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}
