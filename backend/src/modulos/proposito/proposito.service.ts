import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';
import {PropositoEntity} from './proposito.entity';

@Injectable()
export class PropositoService extends ServiceGeneral<PropositoEntity> {
    constructor(
        @InjectRepository(PropositoEntity)
        private readonly _propositoRepository: Repository<PropositoEntity>,
    ) {
        super(_propositoRepository);
    }
}