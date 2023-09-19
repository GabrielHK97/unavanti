import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { Request, Response } from 'express';
export declare class InfoController {
    private readonly infoService;
    constructor(infoService: InfoService);
    create(createInfoDto: CreateInfoDto, response: Response): Promise<Response<any, Record<string, any>>>;
    findAll(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
