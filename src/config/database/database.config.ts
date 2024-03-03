import { ConfigModule } from '@nestjs/config';
import { Socio } from 'src/modules/socios/entities/socio.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { DataSource, DataSourceOptions } from 'typeorm';


ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

export const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        entities: [Usuario, Socio],
        //ssl: true,
        synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
