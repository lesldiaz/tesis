import { Injectable } from '@nestjs/common';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { FUNCIONES_GENERALES } from 'src/constantes/metodos/funciones-generales.metodo';
import * as moment from 'moment';

@Injectable()
export class ProyectoService extends ServiceGeneral<ProyectoEntity> {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
    ) {
        super(_proyectoRepository);
    }

    async crear(objeto): Promise<ProyectoEntity> {
        try {
            console.log(objeto);
            objeto.createdAt = moment().format().toString();
            objeto.updatedAt = moment().format().toString();
            const proyectoCreado = await this._proyectoRepository.save(objeto);
            proyectoCreado.idProyecto = FUNCIONES_GENERALES.generarIdProyecto(proyectoCreado);
            const respuestaEditar = await this._proyectoRepository.update(proyectoCreado.id, proyectoCreado);
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
        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(`Error de servidor. ${e.name}: ${e.message}`),
            );
        }
    }

}
