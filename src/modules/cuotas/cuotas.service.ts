import { Injectable } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Cuota } from "./entities/cuota.entity";
import { Repository } from "typeorm";

@Injectable()
export class CuotasService {
  @InjectRepository(Cuota) private readonly cuotasRepository: Repository<Cuota>;

  async create(createCuotaDto: CreateCuotaDto) {
    const cuota = this.cuotasRepository.create({
      name: createCuotaDto.name,
      year: createCuotaDto.year,
      month: createCuotaDto.month,
      price: createCuotaDto.price,
      isPayed: false,
    });
    await this.cuotasRepository.save(cuota);
    return {
      message: `La cuota ha sido creada con exito`,
      cuota: cuota,
    };
  }

  async findAll() {
    return await this.cuotasRepository.find();
  }

  async findOne(id: string) {
    const cuota = await this.cuotasRepository.find({
      where: { id },
    });
    return cuota
  }

  async update(id: string, updateCuotaDto: UpdateCuotaDto) {
    const cuota = await this.cuotasRepository.findOneByOrFail({ id });
    Object.assign(cuota, updateCuotaDto);
    await this.cuotasRepository.save(cuota);
    return `La cuota ${cuota.name} del año ${cuota.year} y el mes ${cuota.month} ha sido modificada con exito`;
  }

  async remove(id: string) {
    await this.cuotasRepository.delete(id);
    return `La cuota ${id} ha sido eliminada con exito`;
  }

  async filterByYear(year: number) {
    const cuotas = await this.cuotasRepository.find({
      where: { year },
    });
    if (cuotas.length > 0) {
      return cuotas;
    } else {
      return null;
    }
  }
}
