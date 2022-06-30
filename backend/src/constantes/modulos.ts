import { UsuarioModule } from '../modulos/usuario/usuario.module';
import { UsuarioSesionModule } from '../modulos/usuario-sesion/usuario-sesion.module';
import { ProyectoModule } from '../modulos/proyecto/proyecto.module';
import { BloqueModule } from 'src/modulos/bloque/bloque.module';
import { ParticipanteModule } from 'src/modulos/participante/participante.module';
import { ParticipanteProyectoModule } from 'src/modulos/participante-proyecto/participante-proyecto.module';
import { PropositoModule } from 'src/modulos/proposito/proposito.module';
import { RequerimientoModule } from 'src/modulos/requerimiento/requerimiento.module';
import { RequerimientoBloqueModule } from 'src/modulos/requerimiento-bloque/requerimiento-bloque.module';
import { ResultadoModule } from 'src/modulos/resultado/resultado.module';
import { RolModule } from 'src/modulos/rol/rol.module';

export const MODULOS = [
  UsuarioModule,
  UsuarioSesionModule,
  ProyectoModule,
  BloqueModule,
  ParticipanteModule,
  ParticipanteProyectoModule,
  PropositoModule,
  RequerimientoModule,
  RequerimientoBloqueModule,
  ResultadoModule,
  RolModule,
];
