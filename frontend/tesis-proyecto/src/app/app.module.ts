import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ARREGLO_SERVICIOS} from './constantes/arreglo.services';
import {ARREGLO_MODALES} from './constantes/arreglo.modales';
import {ARREGLO_PIPES} from './constantes/arreglo.pipes';
import {ARREGLO_RUTA_COMPONENTES} from './constantes/arreglo.ruta.componentes';
import {ARREGLO_COMPONENTES} from './constantes/arreglo.componentes';
import {RouterModule} from '@angular/router';
import {CookieModule} from 'ngx-cookie';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatOptionModule} from '@angular/material/core';
import {TableModule} from 'primeng/table';
import { ToasterModule } from 'angular2-toaster';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    TableModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    CookieModule.forRoot(),
    ToasterModule.forRoot(),
    MatStepperModule
    MatRadioModule,
  ],
  providers: [{
      
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  },
  
    ...ARREGLO_SERVICIOS
  ],
  entryComponents: [
    ...ARREGLO_MODALES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
