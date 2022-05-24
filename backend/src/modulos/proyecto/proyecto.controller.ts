import { Controller } from '@nestjs/common';
import {ControllerGeneral} from "../../constantes/clases-genericas/controller.generico";
import {ProyectoEntity} from "./proyecto.entity";
import {ProyectoService} from "./proyecto.service";

@Controller('proyecto')
export class ProyectoController extends ControllerGeneral<ProyectoEntity> {
    constructor(private readonly _proyectoService: ProyectoService) {
        super(_proyectoService);
    }
}
