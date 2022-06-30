import { Module } from '@nestjs/common';
import { UsuarioSesionController } from './usuario-sesion.controller';
import { UsuarioSesionService } from './usuario-sesion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioSesionEntity } from './usuario.sesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioSesionEntity], 'default')],
  controllers: [UsuarioSesionController],
  providers: [UsuarioSesionService],
  exports: [UsuarioSesionService],
})
export class UsuarioSesionModule {}
