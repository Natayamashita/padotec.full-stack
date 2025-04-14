import { PrismaService } from 'src/prisma/prisma.service';
import { IotDevice, Prisma } from '@prisma/client';
export declare class IotDeviceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.IotDeviceCreateInput): Promise<{
        deviceId: string;
        mac: string;
    }>;
    findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.IotDeviceWhereUniqueInput;
        where?: Prisma.IotDeviceWhereInput;
        orderBy?: Prisma.IotDeviceOrderByWithRelationInput;
    }): Promise<IotDevice[]>;
    findOne(IotDeviceWhereUniqueInput: string): Promise<IotDevice>;
}
