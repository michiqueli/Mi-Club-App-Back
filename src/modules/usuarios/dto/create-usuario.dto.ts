import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsDate } from "class-validator";
import { ERole } from "../../../common/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(ERole)
    role?: ERole;
}
