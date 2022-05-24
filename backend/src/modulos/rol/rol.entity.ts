import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';


@Entity('rol')
export class RolEntity extends EntityGenerico{

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    nombre: string;

    @OneToMany(
        type => RequerimientoEntity,
        requerimiento => requerimiento.rol
    )
    requerimiento: RequerimientoEntity[];
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}