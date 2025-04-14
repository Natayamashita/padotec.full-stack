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
exports.IotDeviceController = void 0;
const common_1 = require("@nestjs/common");
const iot_device_service_1 = require("./iot-device.service");
const swagger_1 = require("@nestjs/swagger");
const create_iot_device_dto_1 = require("./dto/create-iot-device.dto");
const client_1 = require("@prisma/client");
let IotDeviceController = class IotDeviceController {
    iotDeviceService;
    constructor(iotDeviceService) {
        this.iotDeviceService = iotDeviceService;
    }
    async create(createIotDeviceDto) {
        try {
            return await this.iotDeviceService.create(createIotDeviceDto);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.BadRequestException({
                    message: 'Erro ao criar novo iotDevice',
                    error: error.message,
                });
            }
            throw error;
        }
    }
    async findAll(params) {
        try {
            const iotDevicesReturn = await this.iotDeviceService.findAll(params);
            return iotDevicesReturn.map((device) => ({
                ...device,
                timestamp: device.timestamp.toString(),
            }));
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: `Not found: ${error}`,
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error,
            });
        }
    }
    async findOne(id) {
        try {
            const iotDeviceReturn = await this.iotDeviceService.findOne(id);
            return {
                ...iotDeviceReturn,
                timestamp: iotDeviceReturn.timestamp.toString(),
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: `Not found: ${error}`,
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error,
            });
        }
    }
};
exports.IotDeviceController = IotDeviceController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo dispositivo IoT' }),
    (0, swagger_1.ApiBody)({
        type: create_iot_device_dto_1.CreateIotDeviceDto,
        description: 'Dados do novo dispositivo IoT',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Dispositivo criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro de validação' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_iot_device_dto_1.CreateIotDeviceDto]),
    __metadata("design:returntype", Promise)
], IotDeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Recupera todos os dispositivos IoT com filtros' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de dispositivos IoT'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro de validação' }),
    (0, swagger_1.ApiQuery)({
        name: 'skip',
        required: false,
        description: 'Número de itens a serem pulados na consulta (paginamento)',
        type: Number,
        example: 0,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'take',
        required: false,
        description: 'Número de itens a serem retornados na consulta (paginamento)',
        type: Number,
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'cursor',
        required: false,
        description: 'ID do dispositivo IoT para continuar de onde parou (usado para paginação)',
        type: String,
        example: 'some-unique-id',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'where',
        required: false,
        description: 'Filtros de busca dos dispositivos IoT',
        type: Object,
        example: { status: 'active', mac: '00:1A:2B:3C:4D:5E' },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'orderBy',
        required: false,
        description: 'Ordenação dos resultados da consulta',
        type: Object,
        example: { timestamp: 'desc' },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IotDeviceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'ID do dispositivo IoT a ser recuperado',
        type: String,
        example: '9b3b9d85-c6cf-432c-9777-1a422e89117e',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IotDeviceController.prototype, "findOne", null);
exports.IotDeviceController = IotDeviceController = __decorate([
    (0, common_1.Controller)('iot-device'),
    __metadata("design:paramtypes", [iot_device_service_1.IotDeviceService])
], IotDeviceController);
//# sourceMappingURL=iot-device.controller.js.map