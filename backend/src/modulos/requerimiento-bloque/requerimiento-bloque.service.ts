import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceGeneral } from 'src/constantes/clases-genericas/service.generico';
import { RequerimientoBloqueEntity } from './requerimiento-bloque.entity';

@Injectable()
export class RequerimientoBloqueService extends ServiceGeneral<RequerimientoBloqueEntity> {
  constructor(
    @InjectRepository(RequerimientoBloqueEntity)
    private readonly _requerimientoBloqueRepository: Repository<RequerimientoBloqueEntity>,
  ) {
    super(_requerimientoBloqueRepository);
  }
}
