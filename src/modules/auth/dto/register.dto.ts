import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ERole } from "../../../common/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dni: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    number: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    dob: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string; 

    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsEnum(ERole)
    role?: ERole;
}
