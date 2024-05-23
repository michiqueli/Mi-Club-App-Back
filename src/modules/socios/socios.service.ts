import { Injectable } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';
import { Cuota } from '../cuotas/entities/cuota.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { SocioCuotas } from 'src/common/interfaces/interfaces';

@Injectable()
export class SociosService {
  @InjectRepository(Socio) private readonly socioRepository: Repository<Socio>;
  @InjectRepository(Cuota) private readonly cuotaRepository: Repository<Cuota>;
  @InjectRepository(Actividad)
  private readonly actividadRepository: Repository<Actividad>;

  constructor() {}

  create(createSocioDto: CreateSocioDto) {
    return 'This action adds a new socio';
  }

  async findAll() {
    return await this.socioRepository.find({
      relations: ['usuario', 'cuotas', 'actividades'],
    });
  }

  async findOne(id: string) {
    const socio = await this.socioRepository.find({
      where: { id },
      relations: ['cuotas', 'actividades'],
    });
    if (socio.length > 0) {
      return { socio: socio[0] };
    } else {
      return null;
    }
  }

  async update(id: string, updateSocioDto: UpdateSocioDto) {
    const socio = await this.socioRepository.findOneByOrFail({ id });
    Object.assign(socio, updateSocioDto);
    await this.socioRepository.save(socio);
    return `El socio ${socio.name} ${socio.last_name} ha sido actualizado con exito`;
  }

  async remove(id: string) {
    await this.socioRepository.delete(id);
    return `El socio ${id} ha sido eliminado con exito`;
  }

  async addCuota(socioId: string, cuotaId: string) {
    const existingCuota = await this.cuotaRepository.findOne({
      where: { id: cuotaId },
    });
    const socio = await this.socioRepository.findOne({
      where: { id: socioId },
    });
    const newCuota = {
      id: existingCuota.id,
      name: existingCuota.name,
      month: existingCuota.month,
      year: existingCuota.year,
      price: existingCuota.price,
      isPayed: false,
    };
    socio.cuotas.push(newCuota);
    const cuotasArray = socio.cuotas.map(
      (cuota) => `'${JSON.stringify(cuota)}'`,
    );
    await this.socioRepository
      .createQueryBuilder()
      .update('socios')
      .set({
        cuotas: () => `ARRAY[${cuotasArray.join(', ')}]::jsonb[]`,
      })
      .where('id = :id', { id: socioId })
      .execute();
    return `La cuota ${newCuota.name} del mes ${newCuota.month} y año ${newCuota.year} ha sido agregada de forma correcta al socio ${socio.name} ${socio.last_name}`;
  }

  async payCuota(socioId: string, cuotaId: string) {
    const socio = await this.socioRepository.findOne({
      where: { id: socioId },
    });
    const payed = socio.cuotas.map((cuota) => {
      if (cuota.id == cuotaId) {
        cuota.isPayed = true;
        return true
      }
    });
    if (payed) {
      const cuotasArray = socio.cuotas.map(
        (cuota) => `'${JSON.stringify(cuota)}'`,
      );
      await this.socioRepository
      .createQueryBuilder()
      .update('socios')
      .set({
        cuotas: () => `ARRAY[${cuotasArray.join(', ')}]::jsonb[]`,
      })
      .where('id = :id', { id: socioId })
      .execute();
      return `La cuota ha sido Pagada de forma correcta`
    }
    

  }

  async addActividad(socioId: string, actividadId: string) {
    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadId },
    });
    const socio = await this.socioRepository.findOne({
      where: { id: socioId },
    });

    socio.actividades.push(actividad);
    await this.socioRepository.save(socio);
    return `La actividad ${actividad.name} ha sido agregada de forma correcta al socio ${socio.name} ${socio.last_name}`;
  }
}
