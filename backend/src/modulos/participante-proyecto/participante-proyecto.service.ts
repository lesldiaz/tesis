import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneral } from 'src/constantes/clases-genericas/service.generico';
import { ParticipanteProyectoEntity } from './participante-proyecto.entity';

@Injectable()
export class ParticipanteProyectoService extends ServiceGeneral<ParticipanteProyectoEntity> {
  constructor(
    @InjectRepository(ParticipanteProyectoEntity)
    private readonly _participanteProyectoRepository: Repository<ParticipanteProyectoEntity>,
  ) {
    super(_participanteProyectoRepository);
  }
}
