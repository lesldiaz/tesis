import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        default: 1
    })
    habilitado: boolean;
    @Column()
    age: number;
    @Column({
        length: 6
    })
    colorOjos: string;
    @Column({
        length: 50
    })
    nombre: string;
    @Column({
        length: 50
    })
    apellido: string;
    @Column({
        length: 15
    })
    genero: 'femenino' | 'masculino';
    @Column({
        length: 20
    })
    telefono: string;
    @Column({
        length: 100
    })
    direccion: string;
    @Column({
        type: 'datetime'
    })
    fechaRegistro: Date;
    @Column()
    latitud: number;
    @Column()
    longitud: number;
    @Column({
        nullable: true
    })
    calificacion: number = null;
    @Column(({
        length: 50
    }))
    favoriteFruit: string;
}
