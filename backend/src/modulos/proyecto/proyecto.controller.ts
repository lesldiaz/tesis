import {Body, Controller, Get, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { PaginacionInterface } from 'src/interfaces/paginacion.interface';
import {ControllerGeneral} from "../../constantes/clases-genericas/controller.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {ProyectoService} from "./proyecto.service";

@Controller('proyecto')
export class ProyectoController extends ControllerGeneral<ProyectoEntity> {
    constructor(private readonly _proyectoService: ProyectoService) {
        super(_proyectoService);
    }
    @Post('duplicar-proyecto')
    async duplicar(@Body() datosAGuardar) {
        try {
            return await this._proyectoService.duplicar(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
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
