import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

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
import { RutaParticipantesComponent } from './rutas/ruta-participantes/ruta-participantes.component';
import { RutaParticipanteProyectoComponent } from './rutas/ruta-participante-proyecto/ruta-participante-proyecto.component';
import { MetodoGraficoClienteComponent } from './componentes/metodo-grafico-cliente/metodo-grafico-cliente.component';
import { MetodoGraficoJuegoComponent } from './componentes/metodo-grafico-juego/metodo-grafico-juego.component';
import { PostItComponent } from './componentes/post-it/post-it.component';
import { BloquesGamePlayComponent } from './componentes/bloques-game-play/bloques-game-play.component';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { PestanaComponent } from './componentes/pestana/pestana.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { FlujoTrabajoComponent } from './componentes/flujo-trabajo/flujo-trabajo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { PlantillaClienteComponent } from './componentes/plantilla-cliente/plantilla-cliente.component';
import { PlantillaJuevoComponent } from './componentes/plantilla-juevo/plantilla-juevo.component';
import { PestanaPlantillaComponent } from './componentes/pestana-plantilla/pestana-plantilla.component';

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
    FormularioLoginComponent,
    RutaParticipantesComponent,
    RutaParticipanteProyectoComponent,
    MetodoGraficoClienteComponent,
    MetodoGraficoJuegoComponent,
    PostItComponent,
    BloquesGamePlayComponent,
    PestanaComponent,
    FlujoTrabajoComponent,
    PlantillaClienteComponent,
    PlantillaJuevoComponent,
    PestanaPlantillaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //importa el HttpClient
    FormsModule, // permite funcionalidad de los formularios template
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
