import {Injectable} from '@nestjs/common';
import {Like, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';
import {RequerimientoEntity} from './requerimiento.entity';
import * as moment from 'moment';
import {FUNCIONES_GENERALES} from 'src/constantes/metodos/funciones-generales.metodo';
import {ProyectoEntity} from '../proyecto/proyecto.entity';
import {ResultadoEntity} from '../resultado/resultado.entity';
import {RespuestaInterface} from 'src/interfaces/respuesta.interface';
import {RespuestaBuscarInterface} from 'src/interfaces/respuesta.buscar.interface';

@Injectable()
export class RequerimientoService extends ServiceGeneral<RequerimientoEntity> {
    constructor(
        @InjectRepository(RequerimientoEntity)
        private readonly _requerimientoRepository: Repository<RequerimientoEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
        @InjectRepository(ResultadoEntity)
        private readonly _resultadoRepository: Repository<ResultadoEntity>,
    ) {
        super(_requerimientoRepository);
    }

    async crearMasivo(datosAGuardar: any): Promise<RespuestaInterface<any> | string> {
            try {
                if(datosAGuardar.length){
                    const idProyecto = (datosAGuardar[0] as any).proyecto;
                    const proyecto = await this._proyectoRepository.findOne(idProyecto);


                }
            } catch (e) {
                return new Promise((resolve, reject) =>
                    reject(`Error de Servidor. ${e.name}: ${e.message}`),
                );

        }
        const requermientosClonados = JSON.parse(JSON.stringify(datosAGuardar));
        /*cosas que guardar
        * ver tipo proyecto
        * segun eso guardar:
        * js: proposito, bloques, rol
        * c: lo normal del requerimiento
        * para los padre e hijos hacer un duplicado del array y eliminar todas las referencias a padre
        * ver el tipo de proyecto antes de crear todo lo de arriba, es para el identificador
        * nada mas creo xdd
        * */
        return new Promise(resolve =>
            resolve({
                mensaje: 'Eliminado correctamente',
                codigoRespuesta: 200,
            }),
        );
    }

    async crear(objeto): Promise<RequerimientoEntity | string> {
        try {
            if (objeto.length > 1) {
                objeto.forEach(async requerimiento => {
                    requerimiento.createdAt = moment().format().toString();
                    requerimiento.updatedAt = moment().format().toString();
                    const proyecto = await this._proyectoRepository.findOne(requerimiento.proyecto);
                    const requerimientoCreado = await this._requerimientoRepository.save(requerimiento);
                    requerimientoCreado.idRequerimiento =
                        FUNCIONES_GENERALES
                            .generarIdRequerimiento(
                                {
                                    id: requerimientoCreado.id,
                                    tipoProyecto: proyecto.tipoProyecto
                                }
                            );

                    const respuestaEditar =
                        await this._requerimientoRepository
                            .update(
                                requerimientoCreado.id,
                                {
                                    idRequerimiento: requerimientoCreado.idRequerimiento
                                });
                    const actualizacionExitosa: boolean =
                        respuestaEditar.affected > 0;
                    if (!actualizacionExitosa) {
                        return new Promise((resolve, reject) =>
                            reject('Ocurrió un error al crear id del requerimiento'),
                        );
                    }
                    const resultado = {
                        requerimiento: requerimientoCreado.id,
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString()
                    };
                    const resultadoRequerimiento = await this._resultadoRepository.save(resultado);
                });
                return new Promise((resolve, reject) =>
                    resolve('Completo'),
                );
            } else {
                objeto.createdAt = moment().format().toString();
                objeto.updatedAt = moment().format().toString();
                const proyecto = await this._proyectoRepository.findOne(objeto.proyecto);
                const requerimientoCreado = await this._requerimientoRepository.save(objeto);
                requerimientoCreado.idRequerimiento =
                    FUNCIONES_GENERALES
                        .generarIdRequerimiento(
                            {
                                id: requerimientoCreado.id,
                                tipoProyecto: proyecto.tipoProyecto
                            }
                        );
                const respuestaEditar =
                    await this._requerimientoRepository
                        .update(
                            requerimientoCreado.id,
                            {
                                idRequerimiento: requerimientoCreado.idRequerimiento
                            });
                const actualizacionExitosa: boolean =
                    respuestaEditar.affected > 0;
                if (!actualizacionExitosa) {
                    return new Promise((resolve, reject) =>
                        reject('Ocurrió un error al crear id del requerimiento'),
                    );
                }
                const resultadoRequerimiento = await this._resultadoRepository.save({requerimiento: requerimientoCreado.id});
                return requerimientoCreado;
            }

        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async listarTodos(
        criteriosPaginacion?,
    ): Promise<RespuestaInterface<RequerimientoEntity[]> | string> {
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
                    if (atributo === 'proyecto') {
                        criteriosPaginacion[atributo] = JSON.parse(criteriosPaginacion[atributo]); // mandar con comillas el atributo
                    } else if (atributo !== 'id') {
                        criteriosPaginacion[atributo] = Like(`%${criteriosPaginacion[atributo]}%`);
                    }
                });
                const whereOR = [];
                for (const property in criteriosPaginacion) {
                    const whereORS = {}
                    if (property !== 'proyecto') {
                        whereORS[property] = criteriosPaginacion[property];
                        if (criteriosPaginacion['proyecto']) {
                            whereORS['proyecto'] = criteriosPaginacion['proyecto'];
                        }
                        whereOR.push(whereORS);
                    }
                }
                if (whereOR.length === 0 && criteriosPaginacion['proyecto']) {
                    whereOR.push({
                        proyecto: criteriosPaginacion['proyecto']
                    });
                }
                listarTodo = await this._requerimientoRepository.findAndCount({
                    where: [
                        ...whereOR
                    ],
                    relations: [
                        'rol',
                        'proyecto',
                        'requerimientoPadre',
                        'resultado',
                        'requerimientoBloque',
                        'proposito',
                        'requerimientosHijo'
                    ],
                    order: {...orden},
                    skip: opcionesBusqueda.skip,
                    take: opcionesBusqueda.take
                });
            } else {
                listarTodo = await this._requerimientoRepository.findAndCount({
                    relations: ['rol',
                        'proyecto',
                        'requerimientoPadre',
                        'resultado',
                        'requerimientoBloque',
                        'proposito',
                        'requerimientosHijo'
                    ],
                    ...criteriosPaginacion,
                    order: {
                        id: 'DESC',
                    },
                    skip: criteriosPaginacion.skip,
                    take: criteriosPaginacion.take,
                });
            }
            if (listarTodo[1] > 0) {
                const resultado: RespuestaBuscarInterface<RequerimientoEntity[]> = {
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