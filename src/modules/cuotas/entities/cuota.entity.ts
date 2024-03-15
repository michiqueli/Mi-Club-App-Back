import { BaseEntity } from "src/common/entity/baseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cuotas')
export class Cuota extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    month: number

    @Column()
    year: number

    @Column()
    price: number

    @Column()
    isPayed: boolean
}
