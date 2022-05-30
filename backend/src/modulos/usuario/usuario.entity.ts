import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { UsuarioSesionEntity } from '../usuario-sesion/usuario.sesion.entity';


@Entity('usuario')
export class UsuarioEntity extends EntityGenerico{

    @Column({
        name: 'usuario',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    nombreUsuario: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    email: string;

    @Column({
        name: 'contrasenia',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    contrasena: string;

    @OneToOne(
        type => UsuarioSesionEntity,
        usuarioS => usuarioS.usuario
    )
    usuarioSesion: UsuarioSesionEntity | number;

    @OneToMany(
        type => ProyectoEntity,
        proyecto => proyecto.usuario
    )
    proyecto: ProyectoEntity[];
}
