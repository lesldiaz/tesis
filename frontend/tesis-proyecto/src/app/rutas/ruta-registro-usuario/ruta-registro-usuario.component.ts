import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-registro-usuario',
  templateUrl: './ruta-registro-usuario.component.html',
  styleUrls: ['./ruta-registro-usuario.component.css']
})
export class RutaRegistroUsuarioComponent implements OnInit {

  constructor(
    private readonly  _router: Router
  ) { }

  ngOnInit(): void {
  }
  irAInicio() {
    const ruta = [ 'inicio']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }
}
