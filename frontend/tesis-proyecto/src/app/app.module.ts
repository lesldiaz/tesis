import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// @ts-ignore
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioRegistroComponent } from './componentes/formulario-registro/formulario-registro.component';
import { RutaLoginUsuarioComponent } from './rutas/ruta-login-usuario/ruta-login-usuario.component';
import { RutaRegistroUsuarioComponent } from './rutas/ruta-registro-usuario/ruta-registro-usuario.component';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaAplicacionComponent } from './rutas/ruta-aplicacion/ruta-aplicacion.component';
import { RutaManualUsuarioComponent } from './rutas/ruta-manual-usuario/ruta-manual-usuario.component';
import { RutaMetodologiaComponent } from './rutas/ruta-metodologia/ruta-metodologia.component';
import { RutaPerfilUsuarioComponent } from './rutas/ruta-perfil-usuario/ruta-perfil-usuario.component';
import { RutaProyectosComponent } from './rutas/ruta-proyectos/ruta-proyectos.component';
import { RutaNuevoProyectoComponent } from './rutas/ruta-nuevo-proyecto/ruta-nuevo-proyecto.component';
import { RutaRequerimientoClienteComponent } from './rutas/ruta-requerimiento-cliente/ruta-requerimiento-cliente.component';
import { RutaRequerimientoJuegoComponent } from './rutas/ruta-requerimiento-juego/ruta-requerimiento-juego.component';
import { RutaValidacionComponent } from './rutas/ruta-validacion/ruta-validacion.component';
import { FormularioLoginComponent } from './componentes/formulario-login/formulario-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioRegistroComponent,
    RutaLoginUsuarioComponent,
    RutaRegistroUsuarioComponent,
    RutaInicioComponent,
    RutaAplicacionComponent,
    RutaManualUsuarioComponent,
    RutaMetodologiaComponent,
    RutaPerfilUsuarioComponent,
    RutaProyectosComponent,
    RutaNuevoProyectoComponent,
    RutaRequerimientoClienteComponent,
    RutaRequerimientoJuegoComponent,
    RutaValidacionComponent,
    FormularioLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //importa el HttpClient
    FormsModule, // permite funcionalidad de los formularios template
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
