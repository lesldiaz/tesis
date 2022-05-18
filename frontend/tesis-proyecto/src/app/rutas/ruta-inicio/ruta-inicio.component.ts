import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.css']
})
export class RutaInicioComponent implements OnInit {

  constructor(
    private readonly  _router: Router
  ) { }

  ngOnInit(): void {
  }
  irAAplicacion() {
    const ruta = ['aplicacion']
    this._router.navigate(ruta);
  }
  irAManual() {
    const ruta = [ 'manual']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
  irAPerfil() {
    const ruta = [ 'perfil']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
  irAMetodologia() {
    const ruta = [ 'metodologia']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
}
