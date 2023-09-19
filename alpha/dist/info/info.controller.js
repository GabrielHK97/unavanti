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
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const info_service_1 = require("./info.service");
const create_info_dto_1 = require("./dto/create-info.dto");
const dotenv = require("dotenv");
dotenv.config();
let InfoController = class InfoController {
    constructor(infoService) {
        this.infoService = infoService;
    }
    async create(createInfoDto, response) {
        const responseData = await this.infoService.create(createInfoDto);
        return response
            .status(responseData.status)
            .send({ message: responseData.message });
    }
    async findAll(request, response) {
        const responseData = await this.infoService.findAll(request);
        return response
            .status(responseData.status)
            .send({ message: responseData.message, data: responseData.data });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_info_dto_1.CreateInfoDto, Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "findAll", null);
InfoController = __decorate([
    (0, common_1.Controller)('info'),
    __metadata("design:paramtypes", [info_service_1.InfoService])
], InfoController);
exports.InfoController = InfoController;
//# sourceMappingURL=info.controller.js.map