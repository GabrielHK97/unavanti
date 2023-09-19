"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoService = void 0;
const common_1 = require("@nestjs/common");
const response_data_class_1 = require("../classes/response-data.class");
const typeorm_constants_1 = require("../constants/typeorm.constants");
const producer_service_1 = require("../producer.service");
const typeorm_1 = require("typeorm");
const info_entity_1 = require("./entities/info.entity");
let InfoService = class InfoService {
    constructor(datasource, producerService) {
        this.datasource = datasource;
        this.producerService = producerService;
        this.infoRepository = datasource.getRepository(info_entity_1.Info);
    }
    async create(createInfoDto) {
        try {
            const info = this.infoRepository.create(createInfoDto);
            await this.infoRepository.save(info);
            await this.producerService.produce({
                topic: 'info',
                messages: [{ value: JSON.stringify(info) }],
            });
            return new response_data_class_1.ResponseData(common_1.HttpStatus.OK, 'Info criada!');
        }
        catch (error) {
            return new response_data_class_1.ResponseData(common_1.HttpStatus.BAD_REQUEST, error.message);
        }
    }
    async findAll(request) {
        try {
            const totalItems = (await this.infoRepository.findAndCount({}))[1];
            const infos = await this.infoRepository.find({
                skip: +request.query.skip,
                take: +request.query.take,
            });
            return new response_data_class_1.ResponseData(common_1.HttpStatus.OK, 'Infos listadas!', {
                items: infos,
                totalItems,
            });
        }
        catch (error) {
            return new response_data_class_1.ResponseData(common_1.HttpStatus.BAD_REQUEST, error.message);
        }
    }
};
InfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(typeorm_constants_1.TypeORMConstants.DATA_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        producer_service_1.ProducerService])
], InfoService);
exports.InfoService = InfoService;
//# sourceMappingURL=info.service.js.map