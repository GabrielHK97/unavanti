import { Request } from 'express';
import { ResponseData } from 'src/classes/response-data.class';
import { ProducerService } from 'src/producer.service';
import { DataSource } from 'typeorm';
import { CreateInfoDto } from './dto/create-info.dto';
export declare class InfoService {
    private datasource;
    private producerService;
    private infoRepository;
    constructor(datasource: DataSource, producerService: ProducerService);
    create(createInfoDto: CreateInfoDto): Promise<ResponseData>;
    findAll(request: Request): Promise<ResponseData>;
}
