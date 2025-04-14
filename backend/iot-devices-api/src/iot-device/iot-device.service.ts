import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { IotDevice, Prisma } from '@prisma/client';

@Injectable()
export class IotDeviceService {
  constructor(private prisma: PrismaService) {}

  //Criamos o dispositivo Iot e tratamos caso o Mac seja existente ja, ele retorna uma mensagem de aviso.
  async create(data: Prisma.IotDeviceCreateInput): Promise<{deviceId: string, mac: string}> {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException({
          message: `O dispositivo com o MAC ${data.mac} já existe. O MAC deve ser único.`,
          error: error.message,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException({
          message: 'Erro ao criar novo dispositivo IoT',
          error: error.message,
        });
      }
      
      throw new BadRequestException('Erro inesperado ao criar o dispositivo. Tente novamente mais tarde.');
    }
  }

  //Buscamos todos os dispositivos Iot, com a possibilidade de paginacao e filtros.
  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IotDeviceWhereUniqueInput;
    where?: Prisma.IotDeviceWhereInput;
    orderBy?: Prisma.IotDeviceOrderByWithRelationInput;
  } = {}): Promise<IotDevice[]> {
    const { skip, take, cursor, where, orderBy } = params;
  
    return this.prisma.iotDevice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  //Buscamos um dispositivo Iot em especifico, caso ele nao exista, retornamos uma mensagem de erro.
  async findOne(IotDeviceWhereUniqueInput: string): Promise<IotDevice> {
    const device = await this.prisma.iotDevice.findUnique({
      where: {
        id: IotDeviceWhereUniqueInput
      }
    });
    if(device) {
      return device;
    } else {
      throw new BadRequestException({
        message: 'Dispositivo não encontrado',
        error: 'Dispositivo não encontrado',
      });
    }
  }
}
