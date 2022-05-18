import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('participante')
export class ParticipanteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    nombre: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    apellido: string;

    @Column({
        name: 'funcion',
        type: 'varchar',
        length: 255,
        nullable: true
    })
    funcion?: string;
    
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}