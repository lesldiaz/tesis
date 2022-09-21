import {Body, Controller, InternalServerErrorException, Post} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly _usuarioService: UsuarioService) {}

    @Post('auth')
    async autenticacion(@Body() datosAGuardar) {
        try {
            return await this._usuarioService.autenticacion(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }
    @Post('recuperar-contrasena')
    async recuperarContraseña(@Body() datosAGuardar) {
        try {
            return await this._usuarioService.recuperarContraseña(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }
    @Post('registro')
    async registro(@Body() datosAGuardar) {
        try {
            return await this._usuarioService.registro(datosAGuardar);
        } catch (e) {
            console.error('Error', e);
            throw new InternalServerErrorException(e);
        }
    }
}
