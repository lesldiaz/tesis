import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioInterface } from '../constantes/interfaces/usuario.interface';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class CanActivateViaLoginGuard implements CanActivate {
  usuarioActual: UsuarioInterface | undefined;
  constructor(
    private readonly _authService: AuthService,
    private readonly _toasterService: ToastrService,
    private readonly _router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (!this.usuarioActual) {
      this._toasterService.warning('Usuario no ha iniciado sesión','Iniciar Sesión')
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }
}

