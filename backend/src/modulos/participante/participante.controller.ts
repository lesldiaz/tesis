import { Controller } from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { ParticipanteEntity } from './participante.entity';
import { ParticipanteService } from './participante.service';

@Controller('participante')
export class ParticipanteController extends ControllerGeneral<ParticipanteEntity> {
  constructor(private readonly _participanteService: ParticipanteService) {
    super(_participanteService);
  }
}
