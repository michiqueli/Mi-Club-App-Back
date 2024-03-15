import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../mailer/mailer.service';
import { ERole } from '../../common/enums/role.enum';
import { Socio } from '../socios/entities/socio.entity';

@Injectable()
export class UsuariosService {
  @InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>;
  @InjectRepository(Socio) private readonly socioRepository: Repository<Socio>;
  @Inject('EMAIL_SERVICE') private readonly emailService: EmailService;

  async create(registerDto: RegisterDto) {
    let hashedPassword: string;

    if (registerDto?.password) {
      hashedPassword = await bcrypt.hash(registerDto.password, 10);
    }

    const socio = this.socioRepository.create({
      name: registerDto.name,
      last_name: registerDto.last_name,
      dni: registerDto.dni,
      number: registerDto.number,
      dob: registerDto.dob,
      address: registerDto.address,
      phone: registerDto.phone,
      image: registerDto.image,
      email: registerDto.email,
    });
    const socioCreated = await this.socioRepository.save(socio);

    const user = this.usuarioRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role || ERole.SOCIO,
      socio: socioCreated,
    });
    const userCreated = await this.usuarioRepository.save(user);

    this.emailService.registerEmail(socioCreated.name, userCreated.email);

    return { userCreated };
  }

  async findAll() {
    return await this.usuarioRepository.find({ relations: ['socio']})
  }

  async findOne(id: string) {
    const user = await this.usuarioRepository.find({
      where: { id },
      relations: ['socio'],
    });

    if (user.length > 0) {
      return { user: user[0] };
    } else {
      return null;
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usuarioRepository.findOneByOrFail({ id });
    if (updateUsuarioDto.password) {
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
      updateUsuarioDto.password = hashedPassword;
    }
    Object.assign(user, updateUsuarioDto);
    await this.usuarioRepository.save(user);
    return `El usuario ${user.email} ha sido actualizado con éxito`;
  }

  async remove(id: string) {
    const user = await this.usuarioRepository.find({
      where: { id },
      relations: ['socio'],
    });
    await this.usuarioRepository.softDelete(id);
    this.emailService.offLineEmail(user[0].socio.name, user[0].email);
    return `el Usuario de ${user[0].socio.name} ${user[0].socio.last_name} Esta Fuera de Linea`;
  }

  async restore(id: string) {
    await this.usuarioRepository.restore(id);
    const user = await this.usuarioRepository.find({
      where: { id },
      relations: ['socio'],
    });
    this.emailService.onLineEmail(user[0].socio.name, user[0].email);
    return `el Usuario de ${id} Esta de nuevo En Linea`;
  }

  async findByEmail(email: string) {
    const user = await this.usuarioRepository.findOne({
      where: {
        email: email,
      },
      select: ['password', 'id', 'role'],
    });
    if (!user) throw new NotFoundException(`User ${email} not found`);
    return user;
  }

  async findByGoogleEmail(email: string) {
    console.log('FIND BY EMAIL');
    const user = await this.usuarioRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return user;
  }
}
