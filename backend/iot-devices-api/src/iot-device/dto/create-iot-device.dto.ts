import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsString } from 'class-validator';


/**
 * DTO para criar um dispositivo IoT
 * @class CreateIotDeviceDto
*/
export class CreateIotDeviceDto {
    @Expose()
    @ApiProperty( { example: 'dispositivo 123', description: 'Nome do dispositivo' } )
    @IsString()
    name: string;

    @Expose()
    @ApiProperty({ example: 'email', description: 'Email do dono do dispositivo' })
    @IsEmail()
    email: string;

    @Expose()
    @ApiProperty({ example: 'mac 123', description: 'Endereço MAC do dispositivo' })
    @IsString()
    mac: string;
}
