"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotDeviceModule = void 0;
const common_1 = require("@nestjs/common");
const iot_device_service_1 = require("./iot-device.service");
const iot_device_controller_1 = require("./iot-device.controller");
let IotDeviceModule = class IotDeviceModule {
};
exports.IotDeviceModule = IotDeviceModule;
exports.IotDeviceModule = IotDeviceModule = __decorate([
    (0, common_1.Module)({
        controllers: [iot_device_controller_1.IotDeviceController],
        providers: [iot_device_service_1.IotDeviceService],
    })
], IotDeviceModule);
//# sourceMappingURL=iot-device.module.js.map