import { Injectable } from '@nestjs/common';
import {ServiceGeneral} from "../../constantes/clases-genericas/service.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProyectoService extends ServiceGeneral<ProyectoEntity> {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly _proyectoRepository: Repository<ProyectoEntity>,
    ) {
        super(_proyectoRepository);
    }

}
