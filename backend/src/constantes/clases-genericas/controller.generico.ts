import {
    Body,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ServiceGeneral } from './service.generico';
import { PaginacionInterface } from '../../interfaces/paginacion.interface';

export class ControllerGeneral<Entidad> {
    constructor(private readonly _service: ServiceGeneral<Entidad>) {}
    @Post()
    async crear(@Body() datosAGuardar) {
        try {
            return await this._service.crear(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }
    @Post('eliminar-masivo')
    async eliminarMasivo(@Body() datosAGuardar) {
        try {
            return await this._service.eliminarMasivo(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }

    @Put(':id')
    async editar(@Body() datosActualizar, @Param('id') id: number) {
        try {
            return await this._service.editar(id, datosActualizar);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Delete(':id')
    async eliminar(@Param('id') id: number) {
        try {
            return await this._service.eliminar(id);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get(':id')
    async buscarPorId(@Param('id') id: number) {
        try {
            return await this._service.buscarPorId(id);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get('/personalizada/busqueda')
    async buscarPorParametros(@Query() criterioBusqueda: any) {
        try {
            return await this._service.buscarPorParametros(criterioBusqueda);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get()
    async listarTodos(@Query() paginacion: PaginacionInterface | object) {
        try {
            return await this._service.listarTodos(paginacion);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
