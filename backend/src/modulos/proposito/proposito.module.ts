import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropositoController } from './proposito.controller';
import { PropositoEntity } from './proposito.entity';
import { PropositoService } from './proposito.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropositoEntity], 'default')],
  providers: [PropositoService],
  controllers: [PropositoController],
  exports: [PropositoService],
})
export class PropositoModule {}
