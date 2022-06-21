import {Injectable} from '@nestjs/common';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {FUNCIONES_GENERALES} from 'src/constantes/metodos/funciones-generales.metodo';
import * as moment from 'moment';
import {RespuestaInterface} from 'src/interfaces/respuesta.interface';
import {RespuestaBuscarInterface} from 'src/interfaces/respuesta.buscar.interface';

@Injectable()
export class ProyectoService extends ServiceGeneral<ProyectoEntity> {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
    ) {
        super(_proyectoRepository);
    }

    async crear(objeto): Promise<ProyectoEntity | string> {
        try {
            if (objeto.length > 1) {
                objeto.forEach(async proyecto => {
                    proyecto.createdAt = moment().format().toString();
                    proyecto.updatedAt = moment().format().toString();
                    const proyectoCreado = await this._proyectoRepository.save(proyecto);
                    proyectoCreado.idProyecto = FUNCIONES_GENERALES.generarIdProyecto(proyectoCreado);
                    const respuestaEditar =
                        await this._proyectoRepository
                            .update(
                                proyectoCreado.id,
                                {
                                    idProyecto: proyectoCreado.idProyecto
                                });
                    const actualizacionExitosa: boolean =
                        respuestaEditar.affected > 0;
                    if (!actualizacionExitosa) {
                        return new Promise((resolve, reject) =>
                            reject('Ocurrió un error al crear id del proyecto'),
                        );
                    }
                });
                return new Promise((resolve, reject) =>
                    resolve('Completo'),
                );
            } else {
                objeto.createdAt = moment().format().toString();
                objeto.updatedAt = moment().format().toString();
                const proyectoCreado = await this._proyectoRepository.save(objeto);
                proyectoCreado.idProyecto = FUNCIONES_GENERALES.generarIdProyecto(proyectoCreado);
                const respuestaEditar =
                    await this._proyectoRepository
                        .update(
                            proyectoCreado.id,
                            {
                                idProyecto: proyectoCreado.idProyecto
                            });
                const actualizacionExitosa: boolean =
                    respuestaEditar.affected > 0;
                if (actualizacionExitosa) {
                    return proyectoCreado;
                } else {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al crear id del proyecto'),
                    );
                }
                return proyectoCreado;
            }

        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async listarTodos(
        criteriosPaginacion?,
    ): Promise<RespuestaInterface<ProyectoEntity[]> | string> {
        try {
            const orden: any = {id: 'DESC'};
            const opcionesBusqueda: any = {
                skip: criteriosPaginacion.skip,
                take: criteriosPaginacion.take,
            }
            delete criteriosPaginacion['skip'];
            delete criteriosPaginacion['take'];
            let listarTodo;
            if (criteriosPaginacion) {
                const atributosRep = Object.keys(criteriosPaginacion);
                atributosRep.forEach(atributo => {
                    if (atributo === 'usuario') {
                        criteriosPaginacion[atributo] = JSON.parse(criteriosPaginacion[atributo]); // mandar con comillas el atributo
                    } else if (atributo !== 'id') {
                        criteriosPaginacion[atributo] = Like(`%${criteriosPaginacion[atributo]}%`);
                    }
                });
                const whereOR = [];
                for (const property in criteriosPaginacion) {
                    const whereORS = {}
                    if (property !== 'usuario') {
                        whereORS[property] = criteriosPaginacion[property];
                        if (criteriosPaginacion['usuario']) {
                            whereORS['usuario'] = criteriosPaginacion['usuario'];
                        }
                        whereOR.push(whereORS);
                    }
                }
                if(whereOR.length === 0 && criteriosPaginacion['usuario']){
                    whereOR.push({
                        usuario: criteriosPaginacion['usuario']
                    });
                }
                listarTodo = await this._proyectoRepository.findAndCount({
                    where: [
                        ...whereOR
                    ],
                    relations: ['usuario', 'requerimiento', 'participanteProyecto'],
                    order: {...orden},
                    skip: opcionesBusqueda.skip,
                    take: opcionesBusqueda.take
                });
            } else {
                listarTodo = await this._proyectoRepository.findAndCount({
                    relations: ['usuario', 'requerimiento', 'participanteProyecto'],
                    ...criteriosPaginacion,
                    order: {
                        id: 'DESC',
                    },
                    skip: criteriosPaginacion.skip,
                    take: criteriosPaginacion.take,
                });
            }
            if (listarTodo[1] > 0) {
                const resultado: RespuestaBuscarInterface<ProyectoEntity[]> = {
                    resultado: listarTodo[0],
                    totalResultados: listarTodo[1],
                };
                return new Promise(resolve =>
                    resolve({
                        mensaje: resultado,
                        codigoRespuesta: 200,
                    }),
                );
            } else {
                return new Promise(resolve =>
                    resolve({
                        mensaje: 'No existen resultados',
                        codigoRespuesta: 404,
                    }),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

}
