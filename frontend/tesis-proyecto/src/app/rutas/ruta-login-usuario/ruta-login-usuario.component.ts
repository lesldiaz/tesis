import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-login-usuario',
  templateUrl: './ruta-login-usuario.component.html',
  styleUrls: ['./ruta-login-usuario.component.css']
})
export class RutaLoginUsuarioComponent implements OnInit {

  constructor(
    private readonly  _router: Router
  ) {}

  irARegistro() {
    const ruta = ['/registro']
    this._router.navigate(ruta);
  }
  irAInicio() {
    const ruta = [ 'inicio']
    // /usuario/editar/1
    this._router.navigate(ruta);
  }

  ngOnInit(): void {
  }

}
