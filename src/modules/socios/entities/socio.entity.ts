import { BaseEntity } from "../../../common/entity/baseEntity";
import { Usuario } from "../../../modules/usuarios/entities/usuario.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('socios')
export class Socio extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    dni: string

    @Column()
    name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    dob: string

    @Column()
    address: string

    @Column()
    phone: string

    @Column()
    image: string

    @OneToOne(() => Usuario, (usuario) => usuario.socio)
    usuario: Usuario;
}
