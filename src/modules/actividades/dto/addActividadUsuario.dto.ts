import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddActividadUsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    socioId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    actividadId: string
}