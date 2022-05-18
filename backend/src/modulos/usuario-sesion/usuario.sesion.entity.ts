import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';


@Entity('usuario_sesion')
export class UsuarioSesionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'datetime'
    })
    fechaInicioSesion: string;

    @OneToOne(
        type => UsuarioEntity,
        usuario => usuario.usuarioSesion)
    usuario: UsuarioEntity | number;

}