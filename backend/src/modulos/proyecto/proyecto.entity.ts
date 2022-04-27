import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('proyecto')
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;
}