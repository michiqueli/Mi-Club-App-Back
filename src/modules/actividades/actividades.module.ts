import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { Socio } from '../socios/entities/socio.entity';
import { SociosModule } from '../socios/socios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actividad, Socio]),
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService, SociosModule],
})
export class ActividadesModule {}
