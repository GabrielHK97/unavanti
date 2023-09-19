import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
import { throwError } from 'rxjs';
import { ResponseData } from 'src/classes/response-data.class';
import { TypeORMConstants } from 'src/constants/typeorm.constants';
import { ConsumerService } from 'src/consumer.service';
import { DataSource, Repository } from 'typeorm';
import { CreateInfoDto } from './dto/create-info.dto';
import { Info } from './entities/info.entity';
@Injectable()
export class InfoService implements OnModuleInit {
  private infoRepository: Repository<Info>;
  constructor(
    @Inject(TypeORMConstants.DATA_SOURCE)
    private datasource: DataSource,
    private consumerService: ConsumerService,
  ) {
    this.infoRepository = datasource.getRepository(Info);
  }

  async onModuleInit() {
    try {
      await this.consumerService.consume(
        { topics: ['info'] },
        {
          eachMessage: async ({ topic, partition, message }) => {
            const createInfoDto = new CreateInfoDto();
            createInfoDto.name = JSON.parse(message.value.toString()).name;
            createInfoDto.age = JSON.parse(message.value.toString()).age;
            const info = this.infoRepository.create(createInfoDto);
            await this.infoRepository.save(info);
          },
        },
      );
    } catch (error) {
      throw new Error(error.message);
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
