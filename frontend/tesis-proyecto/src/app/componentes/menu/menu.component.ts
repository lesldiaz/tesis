import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieUsuarioService} from '../../servicios/cookie.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent {
  usuario: any;
  nombreUsuario = 'Invitado';
  // @Input() menuSeleccionado = 'inicio';
  constructor(private readonly _cookieService: CookieUsuarioService,
              private readonly _route: Router) {
    this.usuario = this._cookieService.recuperarUsuarioCookie('usuario');
    if (this.usuario) {
      this.nombreUsuario = this.usuario.nombreUsuario;
    }
  }

  cerrarSesion() {
    this._cookieService.destruirUsuarioCookie();
    this._route.navigate(['login']);
  }

}
