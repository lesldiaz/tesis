import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-aplicacion',
  templateUrl: './ruta-aplicacion.component.html',
  styleUrls: ['./ruta-aplicacion.component.css']
})
export class RutaAplicacionComponent implements OnInit {

  constructor(
    private readonly  _router: Router
  ) { }

  ngOnInit(): void {
  }

  irANuevo() {
    const ruta = [ 'nuevoproyecto']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
  irAProyectos() {
    const ruta = [ 'proyectos']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
  irAParticipantes() {
    const ruta = [ 'participantes']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
}
