import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/baseEntity';
import { Actividad } from 'src/modules/actividades/entities/actividad.entity';
import { Usuario } from '../../../modules/usuarios/entities/usuario.entity';
import { SocioCuotas } from 'src/common/interfaces/interfaces';

@Entity('socios')
export class Socio extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  dni: string;

  @Column({ unique: true })
  number: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  image: string;

  @Column({
    type: 'json',
    array: true,
    default: []
  })
  cuotas: SocioCuotas[];

  @OneToOne(() => Usuario, (usuario) => usuario.socio)
  usuario: Usuario;

  @ManyToMany(() => Actividad, { eager: true, cascade: true })
  @JoinTable({ name: 'socio_actividades' })
  actividades: Actividad[];
}
