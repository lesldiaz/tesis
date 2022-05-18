import {Controller} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {RequerimientoEntity} from './requerimiento.entity';
import {RequerimientoService} from './requerimiento.service';

@Controller('requerimiento')
export class RequerimientoController extends ControllerGeneral<RequerimientoEntity> {
    constructor(private readonly _requerimientoService: RequerimientoService) {
        super(_requerimientoService);
    }
}
