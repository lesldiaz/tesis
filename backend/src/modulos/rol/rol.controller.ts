import { Controller } from '@nestjs/common';
import { ControllerGeneral } from 'src/constantes/clases-genericas/controller.generico';
import { RolEntity } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController extends ControllerGeneral<RolEntity> {
  constructor(private readonly _rolService: RolService) {
    super(_rolService);
  }
}
