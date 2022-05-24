import {Controller} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {PropositoEntity} from './proposito.entity';
import {PropositoService} from './proposito.service';

@Controller('proposito')
export class PropositoController extends ControllerGeneral<PropositoEntity> {
    constructor(private readonly _propositoService: PropositoService) {
        super(_propositoService);
    }
}
