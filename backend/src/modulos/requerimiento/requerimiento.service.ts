import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';
import {RequerimientoEntity} from './requerimiento.entity';
import * as moment from 'moment';
import { FUNCIONES_GENERALES } from 'src/constantes/metodos/funciones-generales.metodo';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ResultadoEntity } from '../resultado/resultado.entity';

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
                        createdAt : moment().format().toString(),
                        updatedAt : moment().format().toString()
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
}