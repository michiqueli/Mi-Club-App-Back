import { Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadesService {
  @InjectRepository(Actividad)
  private readonly actividadRespository: Repository<Actividad>
  
  async create(createActividadeDto: CreateActividadeDto) {
    const actividadCreated = await this.actividadRespository.create(createActividadeDto)
    return actividadCreated;
  }

  async findAll() {
    return await this.actividadRespository.find();
  }

  async findOne(id: string) {
    return await this.actividadRespository.findOne({where: {id}})
  }

  update(id: number, updateActividadeDto: UpdateActividadeDto) {
    return `This action updates a #${id} actividade`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
