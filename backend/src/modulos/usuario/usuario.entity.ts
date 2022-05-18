import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UsuarioSesionEntity } from '../usuario-sesion/usuario.sesion.entity';


@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({
        type: 'datetime'
    })
    fechaRegistro: string;

    // @OneToOne(
    //     type => UsuarioSesionEntity,
    //     usuarioS => usuarioS.usuario)
    // @JoinColumn()
    // usuarioSesion: UsuarioSesionEntity | number;
}
