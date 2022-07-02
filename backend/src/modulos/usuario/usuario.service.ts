import {Injectable} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as moment from 'moment';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";

@Injectable()
export class UsuarioService extends ServiceGeneral<UsuarioEntity> {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ) {
        super(_usuarioRepository);
    }

    async autenticacion(usuario): Promise<UsuarioEntity | string> {
        try {
            const encontrar = await this._usuarioRepository.findOne({
                where: {
                    nombreUsuario: usuario.nombreUsuario,
                    contrasena: usuario.contrasena
                }
            });
            if (encontrar) {
                return encontrar;
            } else {
                return new Promise(resolve =>
                    resolve(
                        'Credenciales incorrectas'
                    ),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async registro(usuario): Promise<UsuarioEntity | string> {
        try {
            usuario.createdAt = moment().format().toString();
            usuario.updatedAt = moment().format().toString();
            const respuestaUsuarios =
                await this._usuarioRepository
                    .find({
                        where: {
                            nombreUsuario: usuario.nombreUsuario
                        }
                    });
            const usuarioNoEncontrado: boolean =
                respuestaUsuarios.length === 0;
            if (usuarioNoEncontrado) {
                const usuarioCreado = await this._usuarioRepository.save(usuario);
                return usuarioCreado;
            } else {
                return new Promise((resolve, reject) =>
                    reject('El nombre de usuario ya esta en uso'),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }
}