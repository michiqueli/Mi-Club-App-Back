import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '../../config/strategies/google.strategy';
import { JwtStrategy } from '../../config/strategies/jwt.strategy';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { EmailService } from '../mailer/mailer.service';
import { jwtModuleOptions } from '../../config/jwt/jwt.config';
import { Socio } from '../socios/entities/socio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Socio]),
    JwtModule.register(jwtModuleOptions),
    PassportModule.register({ 
      defaultStrategy: 'jwt', session: false 
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    {
      provide: 'AUTH_SERVICE', 
      useClass: AuthService
    }, 
    {
      provide: 'USUARIOS_SERVICE', 
      useClass: UsuariosService
    },
    {
      provide: 'EMAIL_SERVICE',
      useClass: EmailService
    }
  ],
})
export class AuthModule {}
