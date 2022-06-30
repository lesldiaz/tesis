import { Controller } from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { RequerimientoBloqueEntity } from './requerimiento-bloque.entity';
import { RequerimientoBloqueService } from './requerimiento-bloque.service';

@Controller('requerimiento-bloque')
export class RequerimientoBloqueController extends ControllerGeneral<RequerimientoBloqueEntity> {
  constructor(
    private readonly _requerimientoBloqueService: RequerimientoBloqueService,
  ) {
    super(_requerimientoBloqueService);
  }
}
