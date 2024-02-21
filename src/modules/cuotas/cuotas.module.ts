import { Module } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';

@Module({
  controllers: [CuotasController],
  providers: [CuotasService],
})
export class CuotasModule {}
