import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ResultadoEntity } from '../resultado/resultado.entity';
import { ResultadoService } from '../resultado/resultado.service';
import {RequerimientoController} from './requerimiento.controller';
import {RequerimientoEntity} from './requerimiento.entity';
import {RequerimientoService} from './requerimiento.service';

@Module({
    imports: [TypeOrmModule.forFeature([RequerimientoEntity, ResultadoEntity, ProyectoEntity], 'default')],
    providers: [RequerimientoService],
    controllers: [RequerimientoController],
    exports: [RequerimientoService],
})
export class RequerimientoModule {
}
