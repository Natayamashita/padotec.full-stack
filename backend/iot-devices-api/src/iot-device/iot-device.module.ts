import { Module } from '@nestjs/common';
import { IotDeviceService } from './iot-device.service';
import { IotDeviceController } from './iot-device.controller';

@Module({
  controllers: [IotDeviceController],
  providers: [IotDeviceService],
})
export class IotDeviceModule {}
