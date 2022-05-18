import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { BloqueEntity } from '../bloque/bloque.entity';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';


@Entity('requerimiento-bloque')
export class RequerimientoBloqueEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => BloqueEntity,
        bloque => bloque.requerimientoBloque
    )
    bloque: number | BloqueEntity;

    @ManyToOne(
        type => RequerimientoEntity,
        requerimiento => requerimiento.requerimientoBloque
    )
    requerimiento: number | RequerimientoEntity;

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}