import { BaseEntity } from "../../../common/entity/baseEntity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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