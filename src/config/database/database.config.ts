import { ConfigModule } from '@nestjs/config';
import { Role } from '../../modules/auth/entities/role.entity'
import { Socio } from '../../modules/socios/entities/socio.entity';
import { Cuota } from '../../modules/cuotas/entities/cuota.entity';
import { Usuario } from '../../modules/usuarios/entities/usuario.entity';
import { Actividad } from '../..//modules/actividades/entities/actividad.entity';
import { DataSource, DataSourceOptions } from 'typeorm';


ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

export const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: +process.env.DB_PORT,
        entities: [Usuario, Socio, Role, Actividad, Cuota],
        ssl: true,
        synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
