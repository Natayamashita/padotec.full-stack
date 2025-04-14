import { IotDeviceService } from './iot-device.service';
import { CreateIotDeviceDto } from './dto/create-iot-device.dto';
import { Prisma } from '@prisma/client';
export declare class IotDeviceController {
    private readonly iotDeviceService;
    constructor(iotDeviceService: IotDeviceService);
    create(createIotDeviceDto: CreateIotDeviceDto): Promise<{
        deviceId: string;
        mac: string;
    }>;
    findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.IotDeviceWhereUniqueInput;
        where?: Prisma.IotDeviceWhereInput;
        orderBy?: Prisma.IotDeviceOrderByWithRelationInput;
    }): Promise<{
        timestamp: string;
        name: string;
        id: string;
        email: string;
        mac: string;
    }[]>;
    findOne(id: string): Promise<{
        timestamp: string;
        name: string;
        id: string;
        email: string;
        mac: string;
    }>;
}
