import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('participante_proyecto')
export class ParticipanteProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}