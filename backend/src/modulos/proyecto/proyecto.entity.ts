import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';


@Entity('proyecto')
export class ProyectoEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 5
    })
    id: string;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    nombre: string;

    @Column({
        name: 'descripcion',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    descripcion: string;

    @Column({
        name: 'estado',
        type: 'varchar',
        length: 2,
        default: 'I'
    })
    estado: 'I' | 'P' | 'F' = 'I';

    @Column({
        name: 'tipo_proyecto',
        type: 'varchar',
        length: 2,
        default: 'C'
    })
    tipoProyecto: 'C' | 'J' = 'C';

    @Column({
        name: 'duplicado',
        type: 'tinyint',
        default: 0
    })
    duplicado: 1 | 0 = 0;

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}