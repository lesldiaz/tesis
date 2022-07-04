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
import {RolEntity} from '../rol/rol.entity';
import {PropositoEntity} from '../proposito/proposito.entity';
import {BloqueEntity} from '../bloque/bloque.entity';
import {RequerimientoBloqueEntity} from '../requerimiento-bloque/requerimiento-bloque.entity';

@Injectable()
export class RequerimientoService extends ServiceGeneral<RequerimientoEntity> {
    constructor(
        @InjectRepository(RequerimientoEntity)
        private readonly _requerimientoRepository: Repository<RequerimientoEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
        @InjectRepository(ResultadoEntity)
        private readonly _resultadoRepository: Repository<ResultadoEntity>,
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,
        @InjectRepository(PropositoEntity)
        private readonly _propositoRepository: Repository<PropositoEntity>,
        @InjectRepository(BloqueEntity)
        private readonly _bloqueRepository: Repository<BloqueEntity>,
        @InjectRepository(RequerimientoBloqueEntity)
        private readonly _requerimientoBloqueRepository: Repository<RequerimientoBloqueEntity>,
    ) {
        super(_requerimientoRepository);
    }

    async crearMasivo(datosAGuardar: any): Promise<RespuestaInterface<any> | string> {
        const requermientosClonados = JSON.parse(JSON.stringify(datosAGuardar));
        try {
            if (datosAGuardar.length) {
                const idProyecto = (datosAGuardar[0] as any).proyecto;
                const proyecto = await this._proyectoRepository.findOne(idProyecto);
                const tipoProyecto = proyecto.tipoProyecto;
                datosAGuardar.forEach(async requerimiento => {
                    const requerimientoGuardar = {
                        descripcion: requerimiento.descripcion,
                        proyecto: requerimiento.proyecto,
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString()
                    }
                    //guardar req esqueleto
                    const requerimientoCreado = await this._requerimientoRepository.save(requerimientoGuardar);
                    //generar id requerimiento
                    requerimientoCreado.idRequerimiento =
                        FUNCIONES_GENERALES
                            .generarIdRequerimiento(
                                {
                                    id: requerimientoCreado.id,
                                    tipoProyecto
                                }
                            );
                    // editar padre aqui - pendiente
                    //editar idReq generado
                    let requerimientoEditar;
                    if (requerimiento.banderaCJ === 1) {
                        requerimientoEditar = {
                            idRequerimiento: requerimientoCreado.idRequerimiento,
                            esReqBloque: 1
                        };
                    } else {
                        requerimientoEditar = {
                            idRequerimiento: requerimientoCreado.idRequerimiento
                        }
                    }
                    const respuestaEditar =
                        await this._requerimientoRepository
                            .update(
                                requerimientoCreado.id,
                                requerimientoEditar);
                    const actualizacionExitosa: boolean =
                        respuestaEditar.affected > 0;
                    if (!actualizacionExitosa) {
                        return new Promise((resolve, reject) =>
                            reject('Ocurrió un error al crear id del requerimiento'),
                        );
                    }
                    // guardar datos resultado previo
                    const resultado = {
                        requerimiento: requerimientoCreado.id,
                        correcto: requerimiento.correcto,
                        apropiado: requerimiento.apropiado,
                        completo: requerimiento.completo,
                        verificable: requerimiento.verificable,
                        factible: requerimiento.factible,
                        sinAmbiguedad: requerimiento.sinAmbiguedad,
                        singular: requerimiento.singular,
                        trazable: requerimiento.trazable,
                        modificable: requerimiento.modificable,
                        consistente: requerimiento.consistente,
                        conforme: requerimiento.conforme,
                        necesario: requerimiento.necesario,
                    }
                    const resultadoRequerimiento = await this._resultadoRepository.save(resultado);
                    return requerimientoCreado;
                });
                //sin prioridad-padre-tiene-bloquesgp
                return new Promise((resolve, reject) =>
                    resolve({mensaje: 'Completo', codigoRespuesta: 200}),
                );
            }
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );

        }
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

    async crearModoGrafico(objeto): Promise<RequerimientoEntity | string> {
        try {
            objeto.createdAt = moment().format().toString();
            objeto.updatedAt = moment().format().toString();
            const propositos = objeto.proposito;
            const rol = objeto.rol;
            if (typeof rol === 'string') {
                const rolCreado = await this._rolRepository.save({
                    nombre: rol,
                    createdAt: moment().format().toString(),
                    updatedAt: moment().format().toString(),
                });
                objeto.rol = rolCreado.id;
            }
            delete objeto.proposito;
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
            const resultadoRequerimiento = await this._resultadoRepository.save(
                {
                    createdAt: moment().format().toString(),
                    updatedAt: moment().format().toString(),
                    requerimiento: requerimientoCreado.id
                }
            );
            if (propositos) {
                propositos.forEach(async proposito => {
                    const resultadoRequerimiento = await this._propositoRepository.save({
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString(),
                        requerimiento: requerimientoCreado.id,
                        descripcion: proposito.descripcion
                    });
                })
            }
            return requerimientoCreado;
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async editarModoGrafico(objeto): Promise<RespuestaInterface<any> | string> {
        try {
            console.log(objeto)
            objeto.updatedAt = moment().format().toString();
            const propositos = objeto.proposito;
            const rol = objeto.rol;
            if (typeof rol === 'string') {
                const rolCreado = await this._rolRepository.save({
                    nombre: rol,
                    createdAt: moment().format().toString(),
                    updatedAt: moment().format().toString(),
                });
                objeto.rol = rolCreado.id;
            }
            delete objeto.proposito;
            console.log(objeto);
            const requerimientoEditado = await this._requerimientoRepository.update(objeto.id, objeto);
            console.log(requerimientoEditado);
            const actualizacionExitosa: boolean =
                requerimientoEditado.affected > 0;
            if (!actualizacionExitosa) {
                return new Promise((resolve, reject) =>
                    reject('Ocurrió un error al editar el requerimiento'),
                );
            }
            if (propositos) {
                await this._propositoRepository.delete({requerimiento: objeto.id});
                propositos.forEach(async proposito => {
                    const resultadoRequerimiento = await this._propositoRepository.save({
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString(),
                        requerimiento: objeto.id,
                        descripcion: proposito.descripcion
                    });
                })
            }
            return new Promise((resolve, reject) =>
                resolve({mensaje: `Editado Correctamente`, codigoRespuesta: 200}),
            );
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async crearModoGraficoJ(objeto): Promise<RequerimientoEntity | string> {
        try {
            objeto.createdAt = moment().format().toString();
            objeto.updatedAt = moment().format().toString();
            const requerimientosBloque = objeto.requerimientoBloque;
            objeto.esReqBloque = 1;
            delete objeto['requerimientoBloque'];
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
            const resultadoRequerimiento = await this._resultadoRepository.save(
                {
                    createdAt: moment().format().toString(),
                    updatedAt: moment().format().toString(),
                    requerimiento: requerimientoCreado.id
                }
            );
            if (requerimientosBloque) {
                requerimientosBloque.forEach(async reqBloque => {
                    const resultadoRequerimiento = await this._requerimientoBloqueRepository.save({
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString(),
                        requerimiento: requerimientoCreado.id,
                        bloque: reqBloque.bloque.id
                    });
                })
            }
            return requerimientoCreado;
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async editarModoGraficoJ(objeto): Promise<RespuestaInterface<any> | string> {
        try {
            objeto.updatedAt = moment().format().toString();
            const bloques = objeto.requerimientoBloque;
            delete objeto['requerimientoBloque'];
            const requerimientoEditado = await this._requerimientoRepository.update(objeto.id, objeto);
            const actualizacionExitosa: boolean =
                requerimientoEditado.affected > 0;
            if (!actualizacionExitosa) {
                return new Promise((resolve, reject) =>
                    reject('Ocurrió un error al editar el requerimiento'),
                );
            }
            if (bloques) {
                await this._propositoRepository.delete({requerimiento: objeto.id});
                bloques.forEach(async reqBloque => {
                    const resultadoRequerimiento = await this._requerimientoBloqueRepository.save({
                        createdAt: moment().format().toString(),
                        updatedAt: moment().format().toString(),
                        requerimiento: objeto.id,
                        bloque: reqBloque.bloque.id
                    });
                })
            }
            return new Promise((resolve, reject) =>
                resolve({mensaje: `Editado Correctamente`, codigoRespuesta: 200}),
            );
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
                        'resultado',
                        'requerimientoBloque',
                        'requerimientoBloque.bloque',
                        'proposito',
                    ],
                    order: {...orden},
                    skip: opcionesBusqueda.skip,
                    take: opcionesBusqueda.take
                });
            } else {
                listarTodo = await this._requerimientoRepository.findAndCount({
                    relations: ['rol',
                        'proyecto',
                        'resultado',
                        'requerimientoBloque',
                        'requerimientoBloque.bloque',
                        'proposito',
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

    async refinamiento(objeto: any): Promise<RespuestaInterface<any> | string> {
        try {
            const idProyecto = objeto.idProyecto;
            const requerimientosARefinar = await this._requerimientoRepository.find({
                where: {
                    proyecto: {
                        id: idProyecto
                    }
                },
                relations: [
                    'proyecto',
                    'resultado'
                ]
            });
            const requerimientosClonados = JSON.parse(JSON.stringify(requerimientosARefinar));
            requerimientosClonados.map(requerimiento => {
                requerimiento.resultado = requerimiento.resultado[0];
            });
            requerimientosClonados.forEach(async requerimientoARefinar => {
                let observacionesFinales = '';
                const saltoLinea = '\n';
                const resultados = requerimientoARefinar.resultado;
                const validacionMin =
                    resultados.correcto
                    && resultados.apropiado
                    && resultados.completo
                    && resultados.verificable
                    && resultados.factible;
                const validacionImplementacion = resultados.necesario;
                const reqIndispensablesCumplidos: string[] = [];
                const reqIndispensablesNoCumplidos: string[] = [];
                if (resultados.correcto) {
                    reqIndispensablesCumplidos.push('Correcto');
                } else {
                    reqIndispensablesNoCumplidos.push('Correcto');
                }
                if (resultados.apropiado) {
                    reqIndispensablesCumplidos.push('Apropiado');
                } else {
                    reqIndispensablesNoCumplidos.push('Apropiado');
                }
                if (resultados.completo) {
                    reqIndispensablesCumplidos.push('Completo');
                } else {
                    reqIndispensablesNoCumplidos.push('Completo');
                }
                if (resultados.verificable) {
                    reqIndispensablesCumplidos.push('Verificable');
                } else {
                    reqIndispensablesNoCumplidos.push('Verificable');
                }
                if (resultados.factible) {
                    reqIndispensablesCumplidos.push('Factible');
                } else {
                    reqIndispensablesNoCumplidos.push('Factible');
                }
                const reqDeseablesCumplidos: string[] = [];
                const reqDeseablesNoCumplidos: string[] = [];
                if (resultados.sinAmbiguedad) {
                    reqDeseablesCumplidos.push('Sin Ambigüedad');
                } else {
                    reqDeseablesNoCumplidos.push('Sin Ambigüedad');
                }
                if (resultados.singular) {
                    reqDeseablesCumplidos.push('Singular');
                } else {
                    reqDeseablesNoCumplidos.push('Singular');
                }
                if (resultados.trazable) {
                    reqDeseablesCumplidos.push('Trazabilidad');
                } else {
                    reqDeseablesNoCumplidos.push('Trazabilidad');
                }
                if (resultados.modificable) {
                    reqDeseablesCumplidos.push('Modificable');
                } else {
                    reqDeseablesNoCumplidos.push('Modificable');
                }
                if (resultados.consistente) {
                    reqDeseablesCumplidos.push('Consistente');
                } else {
                    reqDeseablesNoCumplidos.push('Consistente');
                }
                if (resultados.conforme) {
                    reqDeseablesCumplidos.push('Conforme');
                } else {
                    reqDeseablesNoCumplidos.push('Conforme');
                }
                const msjMinimo = 'El requerimiento cumple con las características mínimas para ser considerado bien formado.';
                const msjMinimoNV = 'El requerimiento no cumple con las características mínimas para ser considerado bien formado.';
                const msjImplementacion = 'Característica indispensable de implementación cumplida: Necesario.';
                const msjImplementacionNV = 'Característica indispensable de implementación no cumplida: Necesario.';
                const msjCaracteristicasInd = 'Características indispensables cumplidas: ';
                const msjCaracteristicasIndNV = 'Características indispensables no cumplidas: ';
                const msjCaracteristicasDes = 'Características deseables cumplidas: ';
                const msjCaracteristicasDesNV = 'Características deseables no cumplidas: ';

                const indispensables = reqIndispensablesCumplidos.length ? (msjCaracteristicasInd + reqIndispensablesCumplidos.join(', ') + saltoLinea) : '';
                console.log('dfsad', indispensables);
                const noIndispensables = reqIndispensablesNoCumplidos.length ? (msjCaracteristicasIndNV + reqIndispensablesNoCumplidos.join(', ') + saltoLinea) : '';
                const implementacion = validacionImplementacion ? (msjImplementacion + saltoLinea) : (msjImplementacionNV + saltoLinea);
                const deseables = reqDeseablesCumplidos.length ? (msjCaracteristicasDes + reqDeseablesCumplidos.join(', ') + saltoLinea) : '';
                const noDeseables = reqDeseablesNoCumplidos.length ? (msjCaracteristicasDesNV + reqDeseablesNoCumplidos.join(', ') + saltoLinea) : '';
                if (validacionMin) {
                    await this._requerimientoRepository.update(requerimientoARefinar.id, {
                        estado: 1
                    });
                    observacionesFinales =
                        msjMinimo + saltoLinea
                        + indispensables
                        + noIndispensables
                        + implementacion
                        + deseables
                        + noDeseables;
                } else {
                    observacionesFinales =
                        msjMinimoNV + saltoLinea
                        + indispensables
                        + noIndispensables
                        + implementacion
                        + deseables
                        + noDeseables;
                }
                const observacion = {
                    observaciones: observacionesFinales
                }
                await this._resultadoRepository.update(resultados.id, observacion);
            });
            await this._proyectoRepository.update(idProyecto, {
                estado: 'F'
            })
            return new Promise((resolve, reject) =>
                resolve({mensaje: 'Completo', codigoRespuesta: 200}),
            );
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }

    async buscarPorIdFull(id: number): Promise<RespuestaInterface<RequerimientoEntity> | string> {
        try {
            const encontrar = await this._requerimientoRepository.findOne(id,
                {
                    relations: [
                        'rol',
                        'proyecto',
                        'resultado',
                        'requerimientoBloque',
                        'requerimientoBloque.bloque',
                        'proposito',
                    ]
                });
            if (encontrar) {
                const resultado: RespuestaBuscarInterface<RequerimientoEntity> = {
                    resultado: encontrar,
                    totalResultados: 1,
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
                        mensaje: 'Id no existe',
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