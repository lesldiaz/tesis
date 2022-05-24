import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ARREGLO_RUTAS} from './constantes/arreglo.rutas';

@NgModule({
  imports: [RouterModule.forRoot(ARREGLO_RUTAS, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
