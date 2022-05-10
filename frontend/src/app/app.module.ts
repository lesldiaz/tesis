import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ARREGLO_COMPONENTES} from './constantes/arreglo.componentes';
import {ARREGLO_RUTA_COMPONENTES} from './constantes/arreglo.ruta.componentes';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ARREGLO_PIPES} from './constantes/arreglo.pipes';
import {ARREGLO_MODALES} from './constantes/arreglo.modales';
import {MatDialogModule, MatFormFieldModule, MatOptionModule, MatProgressBarModule, MatSelectModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {CookieModule, CookieService} from 'ngx-cookie';
import {ToasterModule} from 'angular2-toaster';
import { ARREGLO_SERVICIOS } from './constantes/arreglo.services';

@NgModule({
  declarations: [
    AppComponent,
    ...ARREGLO_COMPONENTES,
    ...ARREGLO_RUTA_COMPONENTES,
    ...ARREGLO_PIPES,
    ...ARREGLO_MODALES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    TextMaskModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    CookieModule.forRoot(),
    ToasterModule.forRoot()
  ],
  providers: [
    ...ARREGLO_SERVICIOS
  ],
  entryComponents: [
    ...ARREGLO_MODALES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
