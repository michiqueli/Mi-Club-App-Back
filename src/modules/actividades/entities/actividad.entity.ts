import { BaseEntity } from "src/common/entity/baseEntity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity('actividades')
export class Actividad extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    days: string

    @Column()
    hours: string
}