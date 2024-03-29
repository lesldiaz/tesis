import {EntityGenerico} from 'src/constantes/clases-genericas/entity.generico';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import {PropositoEntity} from '../proposito/proposito.entity';
import {ProyectoEntity} from '../proyecto/proyecto.entity';
import {RequerimientoBloqueEntity} from '../requerimiento-bloque/requerimiento-bloque.entity';
import {ResultadoEntity} from '../resultado/resultado.entity';
import {RolEntity} from '../rol/rol.entity';


@Entity('requerimiento')
export class RequerimientoEntity extends EntityGenerico {

    @Column({
        type: 'varchar',
        length: 10,
        nullable: true
    })
    idRequerimiento?: string;

    @Column({
        name: 'titulo',
        type: 'varchar',
        length: 200,
        nullable: true
    })
    titulo?: string;

    @Column({
        name: 'descripcion',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    descripcion: string;

    @Column({
        name: 'prioridad',
        type: 'tinyint',
        default: 1
    })
    prioridad?: number = 1;

    @Column({
        name: 'estado',
        type: 'tinyint',
        default: 0
    })
    estado?: 1 | 0 = 0;

    @Column({
        name: 'esReqBloque',
        type: 'tinyint',
        default: 0
    })
    esReqBloque?: 1 | 0 = 0; // 1 es de bloque 0 es normal de cliente

    @ManyToOne(
        type => RolEntity,
        rol => rol.requerimiento, {
            nullable: true,
            onDelete: 'CASCADE',
        }
    )
    rol?: RolEntity | number;

    @ManyToOne(
        type => ProyectoEntity,
        proyecto => proyecto.requerimiento, {
            nullable: false,
            onDelete: 'CASCADE',
        }
    )
    proyecto: ProyectoEntity | number;


    @OneToMany(
        type => ResultadoEntity,
        resultado => resultado.requerimiento,
        {
            cascade: true
        }
    )
    resultado?: ResultadoEntity[];

    @OneToMany(
        type => RequerimientoBloqueEntity,
        requerimientoBloque => requerimientoBloque.requerimiento, {
            cascade: true,
        }
    )
    requerimientoBloque?: RequerimientoBloqueEntity[];

    @OneToMany(
        type => PropositoEntity,
        proposito => proposito.requerimiento, {
            cascade: true,
        }
    )
    proposito?: PropositoEntity[];

    //relacion arbol

  /*  @OneToMany(
        type => RequerimientoEntity,
        requerimiento => requerimiento.requerimientoPadre
    )
    requerimientosHijo: RequerimientoEntity[];*/

    /*@ManyToOne(
        type => RequerimientoEntity,
        requerimiento => requerimiento.requerimientosHijo, {
            nullable: true,
            onDelete: 'SET NULL',
        }
    )*/
    @Column({
        name: 'requerimientoPadreID',
        type: 'varchar',
        nullable: true
    })
    requerimientoPadre?: string;

    // fin relacion arbol

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}