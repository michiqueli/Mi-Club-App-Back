import { Injectable } from '@nestjs/common';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Socio } from './entities/socio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SociosService {
  @InjectRepository(Socio) private readonly socioRepository: Repository<Socio>
  
  create(createSocioDto: CreateSocioDto) {
    return 'This action adds a new socio';
  }

  findAll() {
    return this.socioRepository.find({ relations: ['usuario', 'cuotas', 'actividades'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} socio`;
  }

  update(id: number, updateSocioDto: UpdateSocioDto) {
    return `This action updates a #${id} socio`;
  }

  remove(id: number) {
    return `This action removes a #${id} socio`;
  }
}
