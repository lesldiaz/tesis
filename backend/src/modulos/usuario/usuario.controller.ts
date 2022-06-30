import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController extends ControllerGeneral<UsuarioEntity> {
  constructor(private readonly _usuarioService: UsuarioService) {
    super(_usuarioService);
  }

  @Post('auth')
  async autenticacion(@Body() datosAGuardar) {
    try {
      return await this._usuarioService.autenticacion(datosAGuardar);
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
