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
import { RutaParticipanteProyectoComponent } from './rutas/ruta-participante-proyecto/ruta-participante-proyecto.component';
import { RutaParticipantesComponent } from './rutas/ruta-participantes/ruta-participantes.component';
import { ARREGLO_RUTAS } from './constantes/arreglo.rutas';
const routes: Routes = [
  ...ARREGLO_RUTAS
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
