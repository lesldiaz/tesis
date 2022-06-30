import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { UsuarioSesionService } from './usuario-sesion.service';
import { UsuarioSesionEntity } from './usuario.sesion.entity';

@Controller('usuario-sesion')
export class UsuarioSesionController extends ControllerGeneral<UsuarioSesionEntity> {
  constructor(private readonly _usuarioSesionService: UsuarioSesionService) {
    super(_usuarioSesionService);
  }

  @Post('custom')
  async crearCustom(@Body() datosAGuardar) {
    try {
      return await this._usuarioSesionService.crearCustom(datosAGuardar);
    } catch (e) {
      console.error('Error', e);
      throw new InternalServerErrorException(e);
    }
  }
}
