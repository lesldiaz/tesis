import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RequerimientoBloqueEntity } from '../requerimiento-bloque/requerimiento-bloque.entity';


@Entity('bloque')
export class BloqueEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    nombre: string;

    @OneToMany(
        type => RequerimientoBloqueEntity,
        requerimientoBloque => requerimientoBloque.bloque
    )
    requerimientoBloque: RequerimientoBloqueEntity[];
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}