import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './datasource/datasource.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [InfoModule, DataSourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
