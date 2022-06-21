import {Controller, Get, InternalServerErrorException, Query} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import { PaginacionInterface } from 'src/interfaces/paginacion.interface';
import {RequerimientoEntity} from './requerimiento.entity';
import {RequerimientoService} from './requerimiento.service';

@Controller('requerimiento')
export class RequerimientoController extends ControllerGeneral<RequerimientoEntity> {
    constructor(private readonly _requerimientoService: RequerimientoService) {
        super(_requerimientoService);
    }

    @Get()
    async listarTodos(
        @Query() paginacion: PaginacionInterface | object,
    ) {
        try {
            return await this._requerimientoService.listarTodos(
                paginacion,
            );
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
