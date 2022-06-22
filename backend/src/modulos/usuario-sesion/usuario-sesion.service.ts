import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioSesionEntity} from "./usuario.sesion.entity";
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import * as moment from 'moment';
import {RespuestaInterface} from 'src/interfaces/respuesta.interface';

@Injectable()
export class UsuarioSesionService extends ServiceGeneral<UsuarioSesionEntity> {
    constructor(
        @InjectRepository(UsuarioSesionEntity)
        private readonly _usuarioSesionRepository: Repository<UsuarioSesionEntity>,
    ) {
        super(_usuarioSesionRepository);
    }

    async crearCustom(objeto): Promise<RespuestaInterface<UsuarioSesionEntity> | string> {
        try {
            const usuarioSesionActivo = await this._usuarioSesionRepository.findOne({
                where: {
                    usuario: {
                        id: objeto.usuario
                    }
                }
            });
            if (usuarioSesionActivo) {
                const sesion = {
                    fechaInicioSesionActual: objeto.fechaInicioSesionActual,
                    fechaInicioSesionAnterior: usuarioSesionActivo.fechaInicioSesionActual,
                    usuario: objeto.usuario
                }
                const respuestaEditar = await this._usuarioSesionRepository
                    .update(usuarioSesionActivo.id, sesion);
                const actualizacionExitosa: boolean =
                    respuestaEditar.affected > 0;
                if (!actualizacionExitosa) {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al actualizar'),
                    );
                } else {
                    return new Promise(resolve =>
                        resolve({
                            mensaje: 'Actualizada correctamente',
                            codigoRespuesta: 200,
                        }),
                    );
                }
            } else {
                objeto.createdAt = moment().format().toString();
                objeto.updatedAt = moment().format().toString();
                return await this._usuarioSesionRepository.save(objeto);
            }


        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

}
