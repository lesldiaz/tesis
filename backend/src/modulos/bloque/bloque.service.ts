import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {BloqueEntity} from './bloque.entity';
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';

@Injectable()
export class BloqueService extends ServiceGeneral<BloqueEntity> {
    constructor(
        @InjectRepository(BloqueEntity)
        private readonly _bloqueRepository: Repository<BloqueEntity>,
    ) {
        super(_bloqueRepository);
    }
}