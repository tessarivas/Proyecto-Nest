import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsPositive, IsString, IsStrongPassword } from "class-validator";

export class User {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsStrongPassword()
    password: string;
    
    @IsDate()
    createdAt: Date;
    @IsDate()
    updatedAt: Date;

    @IsBoolean()
    oculto: boolean;
}