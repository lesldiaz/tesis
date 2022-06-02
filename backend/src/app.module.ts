import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CONFIGURACIONES} from "./constantes/configuraciones";
import {ENTIDADES} from "./constantes/entidades";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MODULOS} from "./constantes/modulos";
import { ParticipanteService } from './modulos/participante/participante.service';
import { FUNCIONES_GENERALES } from './constantes/metodos/funciones-generales.metodo';

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
export class AppModule {
  constructor(
      private readonly _participanteService: ParticipanteService,
  ) {
    if (CONFIGURACIONES.crearDatosTest) {
      this.datos();
    } else {
      console.info('Datos no creados');
    }
  }
  async datos() {
    try {
      await FUNCIONES_GENERALES.crearDatos(
          'datos-participante.json',
          this._participanteService,
      );
      console.info('Datos cargados correctamente');
    } catch (e) {
      console.error('Error al crear datos', e);
    }
  }
}
