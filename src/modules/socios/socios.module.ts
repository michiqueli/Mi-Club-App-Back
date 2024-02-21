import { Module } from '@nestjs/common';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Socio } from './entities/socio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Socio]),
  ],
  controllers: [SociosController],
  providers: [SociosService],
})
export class SociosModule {}
