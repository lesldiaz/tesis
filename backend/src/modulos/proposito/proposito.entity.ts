import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('proposito')
export class PropositoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'descripcion',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    descripción: string;

    @Column({
        name: 'es_principal',
        type: 'tinyint',
        default: 0
    })
    esPrincipal: 1 | 0 = 0;

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}