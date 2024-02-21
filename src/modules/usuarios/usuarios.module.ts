import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { EmailService } from '../mailer/mailer.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from '../socios/entities/socio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Socio]),
  ],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    {
      provide: 'EMAIL_SERVICE',
      useClass: EmailService
    }
  ],
})
export class UsuariosModule {}
