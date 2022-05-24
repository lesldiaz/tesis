import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RequerimientoController} from './requerimiento.controller';
import {RequerimientoEntity} from './requerimiento.entity';
import {RequerimientoService} from './requerimiento.service';

@Module({
    imports: [TypeOrmModule.forFeature([RequerimientoEntity], 'default')],
    providers: [RequerimientoService],
    controllers: [RequerimientoController],
    exports: [RequerimientoService],
})
export class RequerimientoModule {
}
