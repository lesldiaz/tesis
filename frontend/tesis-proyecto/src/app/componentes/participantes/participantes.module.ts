import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarComponent } from './crear-editar/crear-editar.component';
import { ListarParticipantesComponent } from './listar/listar-participantes.component';




@NgModule({
  declarations: [
    CrearEditarComponent,
    ListarParticipantesComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ParticipantesModule { }
