import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CONFIGURACIONES} from "./constantes/configuraciones";
import {ENTIDADES} from "./constantes/entidades";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MODULOS} from "./constantes/modulos";

@Module({
  imports: [
      ...MODULOS,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: CONFIGURACIONES.bdd.host,
      port: CONFIGURACIONES.bdd.port,
      username: CONFIGURACIONES.bdd.username,
      password: CONFIGURACIONES.bdd.password,
      database: CONFIGURACIONES.bdd.database,
      entities: [...ENTIDADES],
      synchronize: CONFIGURACIONES.bdd.synchronize,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
