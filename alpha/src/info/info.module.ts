import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { DataSourceModule } from 'src/datasource/datasource.module';
import { ProducerService } from 'src/producer.service';

@Module({
  imports: [DataSourceModule],
  controllers: [InfoController],
  providers: [InfoService, ProducerService]
})
export class InfoModule {}
