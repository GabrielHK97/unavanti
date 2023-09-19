import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  async create(
    @Body() createInfoDto: CreateInfoDto,
    @Res() response: Response,
  ) {
    const responseData = await this.infoService.create(createInfoDto);
    return response
      .status(responseData.status)
      .send({ message: responseData.message});
  }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response) {
    const responseData = await this.infoService.findAll(request);
    return response
      .status(responseData.status)
      .send({ message: responseData.message, data: responseData.data });
  }
}
