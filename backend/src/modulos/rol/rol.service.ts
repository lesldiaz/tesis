import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceGeneral} from 'src/constantes/clases-genericas/service.generico';
import {RolEntity} from './rol.entity';

@Injectable()
export class RolService extends ServiceGeneral<RolEntity> {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,
    ) {
        super(_rolRepository);
    }
}