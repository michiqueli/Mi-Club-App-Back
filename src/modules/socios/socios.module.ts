import { Module } from '@nestjs/common';
import { SociosService } from './socios.service';
import { SociosController } from './socios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Socio } from './entities/socio.entity';
import { Cuota } from '../cuotas/entities/cuota.entity';
import { Actividad } from '../actividades/entities/actividad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Socio, Cuota, Actividad]),
  ],
  controllers: [SociosController],
  providers: [SociosService],
})
export class SociosModule {}
