import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';


@Entity('proposito')
export class PropositoEntity extends EntityGenerico {

    @Column({
        name: 'descripcion',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    descripcion: string;

    @Column({
        name: 'es_principal',
        type: 'tinyint',
        default: 0
    })
    esPrincipal?: 1 | 0 = 0;

    @ManyToOne(
        type => RequerimientoEntity,
        requerimiento => requerimiento.proposito, {
            nullable: false,
            onDelete: 'CASCADE'
        }
    )
    requerimiento: RequerimientoEntity | number;

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}