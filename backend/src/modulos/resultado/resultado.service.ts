import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneral } from 'src/constantes/clases-genericas/service.generico';
import { ResultadoEntity } from './resultado.entity';

@Injectable()
export class ResultadoService extends ServiceGeneral<ResultadoEntity> {
  constructor(
    @InjectRepository(ResultadoEntity)
    private readonly _resultadoRepository: Repository<ResultadoEntity>,
  ) {
    super(_resultadoRepository);
  }
}
