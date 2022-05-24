import {Routes} from '@angular/router';
import {RutaInicioComponent} from '../rutas/inicio/ruta.inicio.component';
import {RutaUsuarioComponent} from '../rutas/usuario/ruta.usuario.component';
import {RutaLoginComponent} from '../rutas/login/ruta-login.component';
import { RutaRegistroUsuarioComponent } from '../rutas/registro-usuario/ruta.registro-usuario.component';
import { RutaMetodologiaComponent } from '../rutas/metodologia/ruta.metodologia.component';
import { RutaManualUsuarioComponent } from '../rutas/manual-usuario/ruta.manual-usuario.component';
import { RutaAplicacionComponent } from '../rutas/aplicacion/ruta.aplicacion.component';
import { RutaNuevoProyectoComponent } from '../rutas/nuevo-proyecto/ruta-nuevo-proyecto.component';
import { RutaProyectosComponent } from '../rutas/proyectos/ruta-proyectos.component';
import { RutaParticipanteProyectoComponent } from '../rutas/participante-proyecto/ruta-participante-proyecto.component';
import { RutaParticipantesComponent } from '../rutas/participantes/ruta-participantes.component';
import { RutaRequerimientoClienteComponent } from '../rutas/requerimiento-cliente/ruta-requerimiento-cliente.component';
import { RutaRequerimientoJuegoComponent } from '../rutas/requerimiento-juego/ruta-requerimiento-juego.component';
import { RutaValidacionComponent } from '../rutas/validacion/ruta-validacion.component';

export const ARREGLO_RUTAS: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent
  },
  {
    path: 'registro',
    component: RutaRegistroUsuarioComponent
  },
  {
    path: 'usuario',
    component: RutaUsuarioComponent
  },
  {
    path: 'metodologia',
    component: RutaMetodologiaComponent
  },
  {
    path: 'manual-usuario',
    component: RutaManualUsuarioComponent
  },
  {
    path: 'aplicacion',
    component: RutaAplicacionComponent
  },
  {
    component: RutaNuevoProyectoComponent,
    path: 'nuevoproyecto'
  },
  {
    component: RutaProyectosComponent,
    path: 'proyectos',
    children:[
      {
        component: RutaParticipanteProyectoComponent,
        path:':id/participanteproyecto'
      }
    ]
  },
  // {
  //   path: 'proyectos/:id/participantes',
  //   component: RutaParticipanteProyectoComponent,
  //   pathMatch: 'full'
  // },
  {
    component: RutaParticipantesComponent,
    path: 'participantes'
  },
  {
    component: RutaRequerimientoClienteComponent,
    path: 'requerimientocliente',
  },
  {
    component: RutaRequerimientoJuegoComponent,
    path: 'requerimientojuego',

  },
  {
    component:RutaValidacionComponent,
    path: 'validacion'
  },
  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
