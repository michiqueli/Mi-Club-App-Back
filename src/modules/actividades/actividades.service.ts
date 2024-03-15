import { Injectable } from "@nestjs/common";
import { CreateActividadeDto } from "./dto/create-actividade.dto";
import { UpdateActividadeDto } from "./dto/update-actividade.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Actividad } from "./entities/actividad.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { Socio } from "../socios/entities/socio.entity";

@Injectable()
export class ActividadesService {
  @InjectRepository(Actividad)
  private readonly actividadRespository: Repository<Actividad>;
  @InjectRepository(Socio)
  private readonly socioRepository: Repository<Socio>;

  async create(createActividadeDto: CreateActividadeDto) {
    const actividad = await this.actividadRespository.create(
      createActividadeDto
    );
    const actividadCreated = this.actividadRespository.save(actividad);
    return actividadCreated;
  }

  async findAll() {
    return await this.actividadRespository.find();
  }

  async findOne(id: string) {
    return await this.actividadRespository.findOne({ where: { id } });
  }

  async update(id: string, updateActividadeDto: UpdateActividadeDto) {
    const actividad = await this.actividadRespository.findOneByOrFail({ id });
    Object.assign(actividad, updateActividadeDto);
    await this.actividadRespository.save(actividad);
    return actividad;
  }

  async remove(id: string) {
    const actividad = await this.actividadRespository.find({
      where: { id },
    });
    await this.actividadRespository.softDelete(id);
    return `La Actividad ${actividad[0].name} ha sido deshabilitada`;
  }

  async restore(id: string) {
    await this.actividadRespository.restore(id);
    const actividad = await this.actividadRespository.find({
      where: { id },
    });
    return `La Actividad ${actividad[0].name} ha sido Habilitada`;
  }

  async addActividadUsuario(addActividadUsuarioDto) {
    const socId = addActividadUsuarioDto.socioId;
    console.log(socId)
    const activiId = addActividadUsuarioDto.actividadId;
    console.log(activiId)
    const socio = await this.socioRepository.findOne({where: {id: socId} });
    console.log(socio)
    const actividad = await this.actividadRespository.findOne({where: {id: activiId}});
    console.log(actividad)
    Object.assign(socio.actividades, actividad)
    await this.socioRepository.save(socio)
    return `La actividad ${actividad.name} ha sido agregada al socio ${socio.name} ${socio.image}`
  }
}