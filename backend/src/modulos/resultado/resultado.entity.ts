import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';


@Entity('resultado')
export class ResultadoEntity extends EntityGenerico{

    @Column({
        name: 'correcto',
        type: 'tinyint',
        default: 0
    })
    correcto: 1 | 0 = 0;

    @Column({
        name: 'apropiado',
        type: 'tinyint',
        default: 0
    })
    apropiado: 1 | 0 = 0;

    @Column({
        name: 'completo',
        type: 'tinyint',
        default: 0
    })
    completo: 1 | 0 = 0;

    @Column({
        name: 'verificable',
        type: 'tinyint',
        default: 0
    })
    verificable: 1 | 0 = 0;

    @Column({
        name: 'factible',
        type: 'tinyint',
        default: 0
    })
    factible: 1 | 0 = 0;

    @Column({
        name: 'sin_ambiguedad',
        type: 'tinyint',
        default: 0
    })
    sinAmbiguedad: 1 | 0 = 0;

    @Column({
        name: 'singular',
        type: 'tinyint',
        default: 0
    })
    singular: 1 | 0 = 0;

    @Column({
        name: 'trazable',
        type: 'tinyint',
        default: 0
    })
    trazable: 1 | 0 = 0;

    @Column({
        name: 'modificable',
        type: 'tinyint',
        default: 0
    })
    modificable: 1 | 0 = 0;

    @Column({
        name: 'consistente',
        type: 'tinyint',
        default: 0
    })
    consistente: 1 | 0 = 0;

    @Column({
        name: 'conforme',
        type: 'tinyint',
        default: 0
    })
    conforme: 1 | 0 = 0;

    @Column({
        name: 'necesario',
        type: 'tinyint',
        default: 0
    })
    necesario: 1 | 0 = 0;

    @Column({
        name: 'observaciones',
        type: 'varchar',
        length: 255,
    })
    observaciones: string;

    @OneToOne(
        type => RequerimientoEntity,
        requerimiento => requerimiento.resultado
    )
    @JoinColumn()
    requerimiento: RequerimientoEntity | number;

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}