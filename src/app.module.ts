import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { dataSourceOptions } from './config/database/database.config';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SociosModule } from './modules/socios/socios.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'hungrytimemailer@gmail.com',
          pass: 'krjm pift qtqs tvos',
        },
      },
    }),
    UsuariosModule,
    SociosModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}