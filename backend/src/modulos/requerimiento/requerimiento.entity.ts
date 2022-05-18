import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';


@Entity('requerimiento')
export class RequerimientoEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 5
    })
    id: string;

    @Column({
        name: 'titulo',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    titulo: string;

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

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}