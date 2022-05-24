import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ParticipanteProyectoEntity } from '../participante-proyecto/participante-proyecto.entity';


@Entity('participante')
export class ParticipanteEntity extends EntityGenerico{

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

    @OneToMany(
        type => ParticipanteProyectoEntity,
        participanteProyecto => participanteProyecto.participante
    )
    participanteProyecto: ParticipanteProyectoEntity[];
    
    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}