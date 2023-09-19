import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ResponseData } from 'src/classes/response-data.class';
import { TypeORMConstants } from 'src/constants/typeorm.constants';
import { ProducerService } from 'src/producer.service';
import { DataSource, Repository } from 'typeorm';
import { CreateInfoDto } from './dto/create-info.dto';
import { Info } from './entities/info.entity';
@Injectable()
export class InfoService {
  private infoRepository: Repository<Info>;
  constructor(
    @Inject(TypeORMConstants.DATA_SOURCE)
    private datasource: DataSource,
    private producerService: ProducerService,
  ) {
    this.infoRepository = datasource.getRepository(Info);
  }

  async create(createInfoDto: CreateInfoDto): Promise<ResponseData> {
    try {
      const info = this.infoRepository.create(createInfoDto);
      await this.infoRepository.save(info);
      await this.producerService.produce({
        topic: 'info',
        messages: [{ value: JSON.stringify(info) }],
      });
      return new ResponseData(HttpStatus.OK, 'Info criada!');
    } catch (error) {
      return new ResponseData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async findAll(request: Request): Promise<ResponseData> {
    try {
      const totalItems = (await this.infoRepository.findAndCount({}))[1];
      const infos = await this.infoRepository.find({
        skip: +request.query.skip,
        take: +request.query.take,
      });
      return new ResponseData(HttpStatus.OK, 'Infos listadas!', {
        items: infos,
        totalItems,
      });
    } catch (error) {
      return new ResponseData(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
