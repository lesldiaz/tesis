import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ARREGLO_RUTAS } from './constantes/arreglo.rutas';
const routes: Routes = [
  ...ARREGLO_RUTAS
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
