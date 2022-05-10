import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UsuarioSesionEntity } from '../usuario-sesion/usuario.sesion.entity';


@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre_usuario',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    nombreUsuario: string;

    @Column({
        name: 'correo_electronico',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    correoElectronico: string;

    @Column({
        name: 'contrasenia',
        type: 'varchar',
        length: 150,
        nullable: false
    })
    contrasenia: string;

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
