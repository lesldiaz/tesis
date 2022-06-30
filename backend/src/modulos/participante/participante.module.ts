import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipanteEntity } from './participante.entity';
import { ParticipanteService } from './participante.service';
import { ParticipanteController } from './participante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipanteEntity], 'default')],
  providers: [ParticipanteService],
  controllers: [ParticipanteController],
  exports: [ParticipanteService],
})
export class ParticipanteModule {}
