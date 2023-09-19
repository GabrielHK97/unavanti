import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { ConsumerService } from 'src/consumer.service';
import { DataSourceModule } from 'src/datasource/datasource.module';

@Module({
  imports: [DataSourceModule],
  controllers: [InfoController],
  providers: [InfoService, ConsumerService]
})
export class InfoModule {}
