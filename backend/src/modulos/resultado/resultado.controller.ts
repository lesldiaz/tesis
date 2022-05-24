import {Controller} from '@nestjs/common';
import {ControllerGeneral} from 'src/constantes/clases-genericas/controller.generico';
import {ResultadoEntity} from './resultado.entity';
import {ResultadoService} from './resultado.service';

@Controller('resultado')
export class ResultadoController extends ControllerGeneral<ResultadoEntity> {
    constructor(private readonly _resultadoService: ResultadoService) {
        super(_resultadoService);
    }
}
