import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueController } from './bloque.controller';
import { BloqueEntity } from './bloque.entity';
import { BloqueService } from './bloque.service';

@Module({
  imports: [TypeOrmModule.forFeature([BloqueEntity], 'default')],
  providers: [BloqueService],
  controllers: [BloqueController],
  exports: [BloqueService],
})
export class BloqueModule {}
