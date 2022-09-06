import {Injectable} from '@nestjs/common';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {Like, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {FUNCIONES_GENERALES} from 'src/constantes/metodos/funciones-generales.metodo';
import * as moment from 'moment';
import {RespuestaInterface} from 'src/interfaces/respuesta.interface';
import {RespuestaBuscarInterface} from 'src/interfaces/respuesta.buscar.interface';
import {ParticipanteProyectoEntity} from '../participante-proyecto/participante-proyecto.entity';
import {RequerimientoEntity} from '../requerimiento/requerimiento.entity';
import {RequerimientoBloqueEntity} from '../requerimiento-bloque/requerimiento-bloque.entity';
import {ResultadoEntity} from '../resultado/resultado.entity';
import {PropositoEntity} from '../proposito/proposito.entity';

@Injectable()
export class ProyectoService extends ServiceGeneral<ProyectoEntity> {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
        @InjectRepository(ParticipanteProyectoEntity)
        private readonly _participanteProyectoRepository: Repository<ParticipanteProyectoEntity>,
        @InjectRepository(RequerimientoEntity)
        private readonly _requerimientoRepository: Repository<RequerimientoEntity>,
        @InjectRepository(RequerimientoBloqueEntity)
        private readonly _requerimientoBloqueRepository: Repository<RequerimientoBloqueEntity>,
        @InjectRepository(ResultadoEntity)
        private readonly _resultadoRepository: Repository<ResultadoEntity>,
        @InjectRepository(PropositoEntity)
        private readonly _propositoRepository: Repository<PropositoEntity>,
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

    async duplicar(objeto): Promise<ProyectoEntity | string> {
        try {
            const proyectoADuplicarId = objeto.id;
            const proyectoADuplicar = await this._proyectoRepository.findOne({
                where: {
                    id: proyectoADuplicarId
                },
                relations: ['participanteProyecto', 'requerimiento', 'requerimiento.resultado', 'requerimiento.requerimientoBloque', 'requerimiento.proposito']
            });
            const participantes = proyectoADuplicar.participanteProyecto;
            const requerimientos = proyectoADuplicar.requerimiento;
            objeto.createdAt = moment().format().toString();
            objeto.updatedAt = moment().format().toString();
            delete objeto.id;
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
                if (participantes) {
                    participantes.forEach(
                        async participante => {
                            participante.proyecto = proyectoCreado.id;
                            const partDuplicado = await this._participanteProyectoRepository.save(participante);
                        }
                    );
                }
                if (requerimientos) {
                    requerimientos.forEach(
                        async requerimiento => {
                            const resultado = requerimiento.resultado[0];
                            const propositos = requerimiento.proposito;
                            const bloques = requerimiento.requerimientoBloque;
                            requerimiento.proyecto = proyectoCreado.id;
                            const requerimientoDuplicado = await this._requerimientoRepository.save(requerimiento);
                            resultado.requerimiento = requerimientoDuplicado.id;
                            const resultadoDuplicado = await this._resultadoRepository.save(resultado);
                            if (bloques) {
                                bloques.forEach(
                                    async bloqueR => {
                                        bloqueR.requerimiento = requerimientoDuplicado.id;
                                        const bloque = await this._requerimientoBloqueRepository.save(bloqueR)
                                    });
                            }
                            if (propositos) {
                                propositos.forEach(
                                    async propositoR => {
                                        propositoR.requerimiento = requerimientoDuplicado.id;
                                        const proposito = await this._propositoRepository.save(propositoR)
                                    });
                            }
                        });
                }
                return proyectoCreado;
            } else {
                return new Promise((resolve, reject) =>
                    reject('Ocurrió un error al crear id del proyecto'),
                );
            }
            return proyectoCreado;

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
                if (whereOR.length === 0 && criteriosPaginacion['usuario']) {
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

    async informes(objeto: any): Promise<any> {
        try {
            const idProyecto = objeto.idProyecto;
            const requerimientosRefinados = await this._requerimientoRepository.find({
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
            const requerimientosClonados = JSON.parse(JSON.stringify(requerimientosRefinados));
            requerimientosClonados.map(requerimiento => {
                requerimiento.resultado = requerimiento.resultado[0];
            });
            //VALIDACION PASTEL
            const datosGraficas = {
                bienFormados: 0,
                noBienFormados: 0,
                minimos: {
                    correcto: 0,
                    apropiado: 0,
                    completo: 0,
                    verificable: 0,
                    factible: 0
                },
                deseables: {
                    sinAmbiguedad: 0,
                    singular: 0,
                    trazable: 0,
                    modificable: 0,
                    consistente: 0,
                    conforme: 0
                },
                implementacion: {
                    necesario: 0
                }
            }
            requerimientosClonados.forEach(requerimiento => {
                const resultados = requerimiento.resultado;
                requerimiento.estado ? datosGraficas.bienFormados += 1 : datosGraficas.noBienFormados += 1;
                resultados.correcto ? datosGraficas.minimos.correcto += 1 : '';
                resultados.apropiado ? datosGraficas.minimos.apropiado += 1 : '';
                resultados.completo ? datosGraficas.minimos.completo += 1 : '';
                resultados.verificable ? datosGraficas.minimos.verificable += 1 : '';
                resultados.factible ? datosGraficas.minimos.factible += 1 : '';
                resultados.necesario ? datosGraficas.implementacion.necesario += 1 : '';
                resultados.sinAmbiguedad ? datosGraficas.deseables.sinAmbiguedad += 1 : '';
                resultados.singular ? datosGraficas.deseables.singular += 1 : '';
                resultados.trazable ? datosGraficas.deseables.trazable += 1 : '';
                resultados.modificable ? datosGraficas.deseables.modificable += 1 : '';
                resultados.consistente ? datosGraficas.deseables.consistente += 1 : '';
                resultados.conforme ? datosGraficas.deseables.conforme += 1 : '';
            });
            return datosGraficas;
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de Servidor. ${e.name}: ${e.message}`),
            );
        }
    }
}
