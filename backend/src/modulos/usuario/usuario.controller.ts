import {Controller} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController extends ControllerGeneral<UsuarioEntity> {
    constructor(private readonly _usuarioService: UsuarioService) {
        super(_usuarioService);
    }
}
