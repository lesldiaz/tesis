import {RutaInicioComponent} from '../rutas/inicio/ruta.inicio.component';
import {RutaUsuarioComponent} from '../rutas/usuario/ruta.usuario.component';
import {RutaLoginComponent} from '../rutas/login/ruta-login.component';
import { RutaRegistroUsuarioComponent } from '../rutas/registro-usuario/ruta.registro-usuario.component';
import { RutaManualUsuarioComponent } from '../rutas/manual-usuario/ruta.manual-usuario.component';
import { RutaMetodologiaComponent } from '../rutas/metodologia/ruta.metodologia.component';
import { RutaAplicacionComponent } from '../rutas/aplicacion/ruta.aplicacion.component';
import { PostItComponent } from '../componentes/post-it/post-it.component';
import { BloquesGamePlayComponent } from '../componentes/bloques-game-play/bloques-game-play.component';
import { PestanaComponent } from '../componentes/pestana/pestana.component';
import { MetodoGraficoJuegoComponent } from '../componentes/metodo-grafico-juego/metodo-grafico-juego.component';
import { MetodoGraficoClienteComponent } from '../componentes/metodo-grafico-cliente/metodo-grafico-cliente.component';
import { RutaParticipanteProyectoComponent } from '../rutas/participante-proyecto/ruta-participante-proyecto.component';
import { RutaParticipantesComponent } from '../rutas/participantes/ruta-participantes.component';
import { RutaValidacionComponent } from '../rutas/validacion/ruta-validacion.component';
import { RutaRequerimientoJuegoComponent } from '../rutas/requerimiento-juego/ruta-requerimiento-juego.component';
import { RutaRequerimientoClienteComponent } from '../rutas/requerimiento-cliente/ruta-requerimiento-cliente.component';
import { RutaNuevoProyectoComponent } from '../rutas/nuevo-proyecto/ruta-nuevo-proyecto.component';
import { RutaProyectosComponent } from '../rutas/proyectos/ruta-proyectos.component';
import { FormularioRegistroComponent } from '../componentes/formulario-registro/formulario-registro.component';
import { FormularioLoginComponent } from '../componentes/formulario-login/formulario-login.component';

export const ARREGLO_RUTA_COMPONENTES = [
  RutaInicioComponent,
  RutaUsuarioComponent, //RutaPerfilUsuarioComponent,
  RutaLoginComponent, //RutaLoginUsuarioComponent,
  RutaRegistroUsuarioComponent,
  RutaMetodologiaComponent,
  RutaManualUsuarioComponent,
  RutaAplicacionComponent,
  FormularioRegistroComponent,
  RutaRegistroUsuarioComponent,
  RutaInicioComponent,
  RutaAplicacionComponent,
  RutaManualUsuarioComponent,
  RutaMetodologiaComponent,
  RutaProyectosComponent,
  RutaNuevoProyectoComponent,
  RutaRequerimientoClienteComponent,
  RutaRequerimientoJuegoComponent,
  RutaValidacionComponent,
  FormularioLoginComponent,
  RutaParticipantesComponent,
  RutaParticipanteProyectoComponent,
  MetodoGraficoClienteComponent,
  MetodoGraficoJuegoComponent,
  PostItComponent,
  BloquesGamePlayComponent,
  PestanaComponent
];
