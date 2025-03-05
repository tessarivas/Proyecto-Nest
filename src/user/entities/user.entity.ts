import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsInt, IsPositive, IsString, IsStrongPassword } from "class-validator";

export class User {
    @ApiProperty({
        description: 'Identificador del usuario',
        example: 1,
    })
    @IsInt({ message: 'El id debe ser un número entero' })
    @IsPositive({ message: 'El id debe ser un número positivo' })
    id: number;

    @ApiProperty({
        description: 'Correo del usuario',
        example: 'jhon.doe@gmail.com',
    })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsEmail({}, { message: 'El email debe ser un email' })
    email: string;

    @ApiProperty({
        description: 'Password del usuario',
        example: 'Aa123456S!',
    })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        description: 'Fecha de creacion del registro',
        example: '2025-03-03',
    })
    @IsDate({ message: 'La fecha de creación debe ser una fecha' })
    createdAt: Date;
    
    @ApiProperty({
        description: 'Fecha de actualizacion del registro',
        example: '2025-03-03',
    })
    @IsDate({ message: 'La fecha de creación debe ser una fecha' })
    updatedAt: Date;
    
    @ApiProperty({
        description: 'Visibilidad del usuario',
        example: 'false',
    })
    @IsBoolean({ message: 'El campo oculto debe ser un booleano' })
    oculto: boolean;
}