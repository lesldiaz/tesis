import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UsuarioInterface } from 'src/app/constantes/interfaces/usuario.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import {CookieUsuarioService} from '../../servicios/cookie.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent {
  usuarioActual: UsuarioInterface;
  nombreUsuario = 'Invitado';
  constructor(private readonly _authService: AuthService,
              private readonly _route: Router) {
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (this.usuarioActual) {
      this.nombreUsuario = this.usuarioActual.nombreUsuario;
    }
  }

  cerrarSesion() {
    this._authService.logout();
    this._route.navigate(['login']);
  }

}
