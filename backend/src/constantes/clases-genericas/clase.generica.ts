import {Body, Delete, Get, Post, Put, Query} from "@nestjs/common";

export class ClaseGenerica {
    @Post()
    crear() {
    }
    @Put(':id')
    editar(@Body() datosActualizar) {
    }
    @Delete(':id')
    eliminar() {
    }
    @Get(':id')
    buscarPorId() {
    }
    @Get()
    buscarPorParametros(@Query() criterioBusqueda){
    }
    @Get()
    listarTodos(){
    }
}