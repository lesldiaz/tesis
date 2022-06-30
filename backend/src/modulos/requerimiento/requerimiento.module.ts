import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueEntity } from '../bloque/bloque.entity';
import { PropositoEntity } from '../proposito/proposito.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { RequerimientoBloqueEntity } from '../requerimiento-bloque/requerimiento-bloque.entity';
import { ResultadoEntity } from '../resultado/resultado.entity';
import { ResultadoService } from '../resultado/resultado.service';
import { RolEntity } from '../rol/rol.entity';
import { RequerimientoController } from './requerimiento.controller';
import { RequerimientoEntity } from './requerimiento.entity';
import { RequerimientoService } from './requerimiento.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RequerimientoEntity,
        ResultadoEntity,
        ProyectoEntity,
        BloqueEntity,
        RequerimientoBloqueEntity,
        RolEntity,
        PropositoEntity,
      ],
      'default',
    ),
  ],
  providers: [RequerimientoService],
  controllers: [RequerimientoController],
  exports: [RequerimientoService],
})
export class RequerimientoModule {}
