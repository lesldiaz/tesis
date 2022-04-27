import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('usuario_sesion')
export class UsuarioSesionEntity {
    @PrimaryGeneratedColumn()
    id: number;
}