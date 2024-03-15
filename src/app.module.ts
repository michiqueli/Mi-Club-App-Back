import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { dataSourceOptions } from './config/database/database.config';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SociosModule } from './modules/socios/socios.module';
import { AuthModule } from './modules/auth/auth.module';
import { CuotasModule } from './modules/cuotas/cuotas.module';
import { ActividadesModule } from './modules/actividades/actividades.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

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
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
    UsuariosModule,
    SociosModule,
    AuthModule,
    CuotasModule,
    ActividadesModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}