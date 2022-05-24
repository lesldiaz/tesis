import { Controller } from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { UsuarioSesionService } from './usuario-sesion.service';
import { UsuarioSesionEntity } from './usuario.sesion.entity';

@Controller('usuario-sesion')
export class UsuarioSesionController extends ControllerGeneral<UsuarioSesionEntity> {
    constructor(private readonly _usuarioSesionService: UsuarioSesionService) {
        super(_usuarioSesionService);
    }
}
