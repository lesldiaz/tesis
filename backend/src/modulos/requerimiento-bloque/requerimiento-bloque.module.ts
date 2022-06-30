import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequerimientoBloqueController } from './requerimiento-bloque.controller';
import { RequerimientoBloqueEntity } from './requerimiento-bloque.entity';
import { RequerimientoBloqueService } from './requerimiento-bloque.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequerimientoBloqueEntity], 'default')],
  providers: [RequerimientoBloqueService],
  controllers: [RequerimientoBloqueController],
  exports: [RequerimientoBloqueService],
})
export class RequerimientoBloqueModule {}
