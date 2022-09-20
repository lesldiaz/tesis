import {Routes} from '@angular/router';
import { CanActivateViaLoginGuard } from '../guards/esta-logueado.guard';
import {RutaAplicacionComponent} from '../rutas/ruta-aplicacion/ruta-aplicacion.component';
import {RutaInicioComponent} from '../rutas/ruta-inicio/ruta-inicio.component';
import {RutaLoginUsuarioComponent} from '../rutas/ruta-login-usuario/ruta-login-usuario.component';
import {RutaManualUsuarioComponent} from '../rutas/ruta-manual-usuario/ruta-manual-usuario.component';
import {RutaMetodologiaComponent} from '../rutas/ruta-metodologia/ruta-metodologia.component';
import {RutaNuevoProyectoComponent} from '../rutas/ruta-nuevo-proyecto/ruta-nuevo-proyecto.component';
import {
  RutaParticipanteProyectoComponent
} from '../rutas/ruta-participante-proyecto/ruta-participante-proyecto.component';
import {RutaParticipantesComponent} from '../rutas/ruta-participantes/ruta-participantes.component';
import {RutaPerfilUsuarioComponent} from '../rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import {RutaProyectosComponent} from '../rutas/ruta-proyectos/ruta-proyectos.component';
import { RutaRecuperarContrasenaComponent } from '../rutas/ruta-recuperar-contrasena/ruta-recuperar-contrasena.component';
import {RutaRegistroUsuarioComponent} from '../rutas/ruta-registro-usuario/ruta-registro-usuario.component';
import { RutaReporteGraficoComponent } from '../rutas/ruta-reporte-grafico/ruta-reporte-grafico.component';

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
    path: 'recuperar-contrasena',
    component: RutaRecuperarContrasenaComponent,
  },
  {
    path: 'perfil-usuario',
    component: RutaPerfilUsuarioComponent,
    canActivate: [CanActivateViaLoginGuard]
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
    component: RutaAplicacionComponent,
    canActivate: [CanActivateViaLoginGuard]
  },
  {
    path: 'nuevoproyecto/:id',
    component: RutaNuevoProyectoComponent,
    pathMatch: 'full',
    canActivate: [CanActivateViaLoginGuard]
  },
  {
    path: 'proyectos/reporte-grafico/:id',
    component: RutaReporteGraficoComponent,
    pathMatch: 'full',
  },
  {
    path: 'proyectos',
    component: RutaProyectosComponent,
    canActivate: [CanActivateViaLoginGuard]
  },
  {
    path: 'proyectos/participantes/:id',
    component: RutaParticipanteProyectoComponent,
    pathMatch: 'full',
    canActivate: [CanActivateViaLoginGuard]
  },
  {
    path: 'participantes',
    component: RutaParticipantesComponent,
    canActivate: [CanActivateViaLoginGuard]
  },
  {
    path: 'login',
    component: RutaLoginUsuarioComponent
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];
