import { Controller, Get, InternalServerErrorException, Query } from '@nestjs/common';
import { PaginacionInterface } from 'src/interfaces/paginacion.interface';
import {ControllerGeneral} from "../../constantes/clases-genericas/controller.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {ProyectoService} from "./proyecto.service";

@Controller('proyecto')
export class ProyectoController extends ControllerGeneral<ProyectoEntity> {
    constructor(private readonly _proyectoService: ProyectoService) {
        super(_proyectoService);
    }

    @Get()
    async listarTodos(
        @Query() paginacion: PaginacionInterface | object,
    ) {
        try {
            return await this._proyectoService.listarTodos(
                paginacion,
            );
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
