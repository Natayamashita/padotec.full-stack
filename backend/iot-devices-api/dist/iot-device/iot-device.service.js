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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotDeviceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let IotDeviceService = class IotDeviceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            data.timestamp = new Date().getTime();
            const newDevice = await this.prisma.iotDevice.create({
                data: {
                    ...data,
                    timestamp: new Date().getTime(),
                },
            });
            return {
                deviceId: newDevice.id,
                mac: newDevice.mac,
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException({
                    message: `O dispositivo com o MAC ${data.mac} já existe. O MAC deve ser único.`,
                    error: error.message,
                });
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.BadRequestException({
                    message: 'Erro ao criar novo dispositivo IoT',
                    error: error.message,
                });
            }
            throw new common_1.BadRequestException('Erro inesperado ao criar o dispositivo. Tente novamente mais tarde.');
        }
    }
    findAll(params = {}) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.iotDevice.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async findOne(IotDeviceWhereUniqueInput) {
        const device = await this.prisma.iotDevice.findUnique({
            where: {
                id: IotDeviceWhereUniqueInput
            }
        });
        if (device) {
            return device;
        }
        else {
            throw new common_1.BadRequestException({
                message: 'Dispositivo não encontrado',
                error: 'Dispositivo não encontrado',
            });
        }
    }
};
exports.IotDeviceService = IotDeviceService;
exports.IotDeviceService = IotDeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IotDeviceService);
//# sourceMappingURL=iot-device.service.js.map