import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { IotDeviceService } from './iot-device.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateIotDeviceDto } from './dto/create-iot-device.dto';
import { Prisma } from '@prisma/client';

@Controller('iot-device')
export class IotDeviceController {
  constructor(private readonly iotDeviceService: IotDeviceService) {}

  // Criaçao de dispositivo Iot 
  @ApiOperation({ summary: 'Cria um novo dispositivo IoT' })
  @ApiBody({
    type: CreateIotDeviceDto,
    description: 'Dados do novo dispositivo IoT',
  })
  @ApiResponse({ status: 201, description: 'Dispositivo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @Post()
  async create(@Body() createIotDeviceDto: CreateIotDeviceDto) {
    try {
      return await this.iotDeviceService.create(createIotDeviceDto);
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException({
          message: 'Erro ao criar novo iotDevice',
          error: error.message,
        });
      }
      throw error;
    }
  }

  // Busca geral de dispositivo Iot 
  @Get()
  @ApiOperation({ summary: 'Recupera todos os dispositivos IoT com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de dispositivos IoT'
  })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Número de itens a serem pulados na consulta (paginamento)',
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Número de itens a serem retornados na consulta (paginamento)',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description:
      'ID do dispositivo IoT para continuar de onde parou (usado para paginação)',
    type: String,
    example: 'some-unique-id',
  })
  @ApiQuery({
    name: 'where',
    required: false,
    description: 'Filtros de busca dos dispositivos IoT',
    type: Object,
    example: { status: 'active', mac: '00:1A:2B:3C:4D:5E' },
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Ordenação dos resultados da consulta',
    type: Object,
    example: { timestamp: 'desc' },
  })
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IotDeviceWhereUniqueInput;
    where?: Prisma.IotDeviceWhereInput;
    orderBy?: Prisma.IotDeviceOrderByWithRelationInput;
  }) {
    try {
      const iotDevicesReturn = await this.iotDeviceService.findAll(params);
      return iotDevicesReturn.map((device) => ({
        ...device,
        timestamp: device.timestamp.toString(),
      }));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Not found: ${error}`,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  // Busca de dispositivo Iot por ID
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do dispositivo IoT a ser recuperado',
    type: String,
    example: '9b3b9d85-c6cf-432c-9777-1a422e89117e',
  })
  async findOne(@Param('id') id: string) {
    try {
      const iotDeviceReturn = await this.iotDeviceService.findOne(id);
      return {
        ...iotDeviceReturn,
        timestamp: iotDeviceReturn.timestamp.toString(),
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `Not found: ${error}`,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
