import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoController } from './resultado.controller';
import { ResultadoEntity } from './resultado.entity';
import { ResultadoService } from './resultado.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEntity], 'default')],
  providers: [ResultadoService],
  controllers: [ResultadoController],
  exports: [ResultadoService],
})
export class ResultadoModule {}
