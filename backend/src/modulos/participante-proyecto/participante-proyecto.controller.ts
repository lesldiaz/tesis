import {Controller} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {ParticipanteProyectoEntity} from './participante-proyecto.entity';
import {ParticipanteProyectoService} from './participante-proyecto.service';

@Controller('participante-proyecto')
export class ParticipanteProyectoController extends ControllerGeneral<ParticipanteProyectoEntity> {
    constructor(private readonly _participanteProyectoService: ParticipanteProyectoService) {
        super(_participanteProyectoService);
    }
}
