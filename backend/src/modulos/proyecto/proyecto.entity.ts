import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { ParticipanteProyectoEntity } from '../participante-proyecto/participante-proyecto.entity';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';


@Entity('proyecto')
export class ProyectoEntity extends EntityGenerico {
    @Column({
        type: 'varchar',
        length: 5,
        nullable: true
    })
    idProyecto: string;

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

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.proyecto,
        {
            nullable: false,
            onDelete: 'CASCADE',
        }
    )
    usuario: UsuarioEntity | number;

    @OneToMany(
        type => RequerimientoEntity,
        requerimiento => requerimiento.proyecto, {
            cascade:true
        }
    )
    requerimiento: RequerimientoEntity[];

    @OneToMany(
        type => ParticipanteProyectoEntity,
        participanteProyecto => participanteProyecto.proyecto,
        {
            cascade:true
        }
    )
    participanteProyecto: ParticipanteProyectoEntity[];

    // @ManyToOne(
    //     type => EntidadSesionEntity,
    //     entidad2 => entidad2.entidad)
    // entidad2: Entidad2Entity | number;
}