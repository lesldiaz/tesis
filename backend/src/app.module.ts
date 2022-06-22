import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CONFIGURACIONES} from "./constantes/configuraciones";
import {ENTIDADES} from "./constantes/entidades";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MODULOS} from "./constantes/modulos";
import { ParticipanteService } from './modulos/participante/participante.service';
import { FUNCIONES_GENERALES } from './constantes/metodos/funciones-generales.metodo';
import { UsuarioService } from './modulos/usuario/usuario.service';
import { ProyectoService } from './modulos/proyecto/proyecto.service';
import { BloqueService } from './modulos/bloque/bloque.service';
import { RequerimientoService } from './modulos/requerimiento/requerimiento.service';
import { RolService } from './modulos/rol/rol.service';

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
      dropSchema: CONFIGURACIONES.bdd.dropSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
      private readonly _participanteService: ParticipanteService,
      private readonly _usuarioService: UsuarioService,
      private readonly _proyectoService: ProyectoService,
      private readonly _bloqueService: BloqueService,
      private readonly _rolService: RolService,
      private readonly _requerimientoService: RequerimientoService,
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
      await FUNCIONES_GENERALES.crearDatos(
          'datos-usuario.json',
          this._usuarioService,
      );
      FUNCIONES_GENERALES.crearDatos(
          'datos-rol.json',
          this._rolService,
      );
      await FUNCIONES_GENERALES.crearDatos(
          'datos-proyecto.json',
          this._proyectoService,
      );
      await FUNCIONES_GENERALES.crearDatos(
          'datos-bloque.json',
          this._bloqueService,
      );
      await FUNCIONES_GENERALES.crearDatos(
          'datos-requerimiento.json',
          this._requerimientoService,
      );
      console.info('Datos cargados correctamente');
    } catch (e) {
      console.error('Error al crear datos', e);
    }
  }
}
