import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioInterface} from 'src/app/constantes/interfaces/usuario.interface';
import {AuthService} from 'src/app/servicios/auth.service';
import {CookieUsuarioService} from '../../servicios/cookie.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent implements DoCheck  {
  usuarioActual: UsuarioInterface | undefined;
  nombreUsuario = 'Invitado';

  constructor(private readonly _authService: AuthService,
              private readonly _route: Router) {
  }

  ngDoCheck(): void {
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (this.usuarioActual) {
      this.nombreUsuario = this.usuarioActual.nombreUsuario;
    }
  }

  cerrarSesion() {
    this._authService.logout();
    this.nombreUsuario = 'Invitado';
    this._route.navigate(['login']);
  }

}
