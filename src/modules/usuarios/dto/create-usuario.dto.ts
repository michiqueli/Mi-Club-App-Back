import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsDate } from "class-validator";
import { ERole } from "../../../common/enums/role.enum";

export class CreateUsuarioDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(ERole)
    role?: ERole;
}
