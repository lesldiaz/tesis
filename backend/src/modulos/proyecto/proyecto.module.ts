import {Module} from '@nestjs/common';
import {ProyectoController} from './proyecto.controller';
import {ProyectoService} from './proyecto.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProyectoEntity} from "./proyecto.entity";
import { ParticipanteProyectoEntity } from '../participante-proyecto/participante-proyecto.entity';
import { RequerimientoEntity } from '../requerimiento/requerimiento.entity';
import { ResultadoEntity } from '../resultado/resultado.entity';
import { RequerimientoBloqueEntity } from '../requerimiento-bloque/requerimiento-bloque.entity';
import { PropositoEntity } from '../proposito/proposito.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        ProyectoEntity,
        ParticipanteProyectoEntity,
        RequerimientoEntity,
        ResultadoEntity,
        RequerimientoBloqueEntity,
        PropositoEntity
    ], 'default')],
    controllers: [ProyectoController],
    providers: [ProyectoService],
    exports: [ProyectoService],
})
export class ProyectoModule {
}
