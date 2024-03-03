import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ERole } from "src/common/enums/role.enum";

export class RegisterDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    dni: string

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    dob: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsNotEmpty()
    @IsString()
    phone: string; 

    @IsOptional()
    @IsString()
    image?: string;
    
    @IsOptional()
    @IsEnum(ERole)
    role?: ERole;
}
