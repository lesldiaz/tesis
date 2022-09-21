import {Controller} from '@nestjs/common';
import {ControllerGeneral} from '../../constantes/clases-genericas/controller.generico';
import {BloqueEntity} from './bloque.entity';
import {BloqueService} from './bloque.service';

@Controller('bloque')
export class BloqueController extends ControllerGeneral<BloqueEntity> {
    constructor(private readonly _bloqueService: BloqueService) {
        super(_bloqueService);
    }
}
