import {Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Query} from '@nestjs/common';
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

    @Post('carga-masiva')
    async crearMasivo(@Body() datosAGuardar) {
        try {
            return await this._requerimientoService.crearMasivo(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }

    @Post('add-reqb')
    async agregarReModoGrafico(@Body() datosAGuardar) {
        try {
            return await this._requerimientoService.crearModoGrafico(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }

    @Get(':id')
    async buscarPorId(@Param('id') id: number) {
        try {
            return await this._requerimientoService.buscarPorIdFull(id);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Put('refinamiento')
    async refinarReq(@Body() idProyecto) {
        try {
            return await this._requerimientoService.refinamiento(idProyecto);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }
}
