import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private kafka = new Kafka({
    brokers: [`${process.env.KAFKA_URL}:${process.env.KAFKA_PORT}`],
  });
  private consumer: Consumer = this.kafka.consumer({ groupId: 'kafka' });
  private consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    await this.consumer.connect();
    await this.consumer.subscribe(topic);
    await this.consumer.run(config);
    this.consumers.push(this.consumer);
  }

  async onApplicationShutdown(signal?: string) {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
