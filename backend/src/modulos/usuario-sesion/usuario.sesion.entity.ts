import { EntityGenerico } from 'src/constantes/clases-genericas/entity.generico';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';


@Entity('usuario_sesion')
export class UsuarioSesionEntity extends EntityGenerico {

    @Column({
        type: 'datetime'
    })
    fechaInicioSesion: string;

    @OneToOne(
        type => UsuarioEntity,
        usuario => usuario.usuarioSesion)
    usuario: UsuarioEntity | number;

}