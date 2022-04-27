import { Module } from '@nestjs/common';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProyectoEntity} from "./proyecto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity], 'default')],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
