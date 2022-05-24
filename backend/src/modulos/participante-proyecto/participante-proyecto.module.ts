import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ParticipanteProyectoController} from './participante-proyecto.controller';
import {ParticipanteProyectoEntity} from './participante-proyecto.entity';
import {ParticipanteProyectoService} from './participante-proyecto.service';

@Module({
    imports: [TypeOrmModule.forFeature([ParticipanteProyectoEntity], 'default')],
    providers: [ParticipanteProyectoService],
    controllers: [ParticipanteProyectoController],
    exports: [ParticipanteProyectoService],
})
export class ParticipanteProyectoModule {
}
