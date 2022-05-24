import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaLoginUsuarioComponent} from './rutas/ruta-login-usuario/ruta-login-usuario.component';
import { RutaRegistroUsuarioComponent } from './rutas/ruta-registro-usuario/ruta-registro-usuario.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaAplicacionComponent } from './rutas/ruta-aplicacion/ruta-aplicacion.component';
import { RutaManualUsuarioComponent } from './rutas/ruta-manual-usuario/ruta-manual-usuario.component';
import { RutaMetodologiaComponent } from './rutas/ruta-metodologia/ruta-metodologia.component';
import { RutaPerfilUsuarioComponent } from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import { RutaNuevoProyectoComponent } from './rutas/ruta-nuevo-proyecto/ruta-nuevo-proyecto.component';
import { RutaProyectosComponent } from './rutas/ruta-proyectos/ruta-proyectos.component';
import { RutaRequerimientoClienteComponent } from './rutas/ruta-requerimiento-cliente/ruta-requerimiento-cliente.component';
import { RutaRequerimientoJuegoComponent } from './rutas/ruta-requerimiento-juego/ruta-requerimiento-juego.component';
import { RutaValidacionComponent } from './rutas/ruta-validacion/ruta-validacion.component';
import { RutaParticipanteProyectoComponent } from './rutas/ruta-participante-proyecto/ruta-participante-proyecto.component';
import { RutaParticipantesComponent } from './rutas/ruta-participantes/ruta-participantes.component';
const routes: Routes = [
  {
    component: RutaLoginUsuarioComponent,
    path: 'login'
  },{
    component: RutaRegistroUsuarioComponent,
    path: 'registro'
  },
  {
    component: RutaInicioComponent,
    path: 'inicio'
  }, {
    component: RutaManualUsuarioComponent,
    path: 'manual'
  }, {
    component: RutaMetodologiaComponent,
    path: 'metodologia'
  },
  {
    component: RutaPerfilUsuarioComponent,
    path: 'perfil'
  },
  {
    component:RutaAplicacionComponent,
    path:'aplicacion'
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
        path:'participanteproyecto'
      }
    ]
  },
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
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
