import { Controller } from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {ControllerGeneral} from "../../constantes/clases-genericas/controller.generico";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController extends ControllerGeneral<UsuarioEntity> {
    constructor(private readonly _usuarioService: UsuarioService) {
        super(_usuarioService);
    }
}
