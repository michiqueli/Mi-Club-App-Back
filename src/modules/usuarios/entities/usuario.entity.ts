import { BaseEntity } from "src/common/entity/baseEntity";
import { Role } from "src/modules/auth/entities/role.entity";
import { Socio } from "src/modules/socios/entities/socio.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuarios')
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @ManyToOne(() => Role, (role) => role.name, {
        nullable: false
    })
    @JoinColumn({
      name: 'role',
      referencedColumnName: 'name',
    })
    @Column({
        select: true,
    })
    role: string;
    @OneToOne(() => Socio, (socio) => socio.usuario)
    @JoinColumn({name: 'socio_usuario'})
    socio: Socio;
}