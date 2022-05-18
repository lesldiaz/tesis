import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ParticipanteEntity } from '../participante/participante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';


@Entity('participante_proyecto')
export class ParticipanteProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => ProyectoEntity,
        proyecto => proyecto.participanteProyecto
    )
    proyecto: ProyectoEntity | number;

    @ManyToOne(
        type => ParticipanteEntity,
        participante => participante.participanteProyecto
    )
    participante: ParticipanteEntity | number;
    
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}