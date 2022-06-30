import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipanteEntity } from './participante.entity';
import { ServiceGeneral } from 'src/constantes/clases-genericas/service.generico';

@Injectable()
export class ParticipanteService extends ServiceGeneral<ParticipanteEntity> {
  constructor(
    @InjectRepository(ParticipanteEntity)
    private readonly _participanteRepository: Repository<ParticipanteEntity>,
  ) {
    super(_participanteRepository);
  }
}
