import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ProducerRecord } from 'kafkajs';
export declare class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private kafka;
    private producer;
    onModuleInit(): Promise<void>;
    produce(record: ProducerRecord): Promise<void>;
    onApplicationShutdown(signal?: string): Promise<void>;
}
