import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';
import {RequerimientoEntity} from './requerimiento.entity';

@Injectable()
export class RequerimientoService extends ServiceGeneral<RequerimientoEntity> {
    constructor(
        @InjectRepository(RequerimientoEntity)
        private readonly _requerimientoRepository: Repository<RequerimientoEntity>,
    ) {
        super(_requerimientoRepository);
    }
}