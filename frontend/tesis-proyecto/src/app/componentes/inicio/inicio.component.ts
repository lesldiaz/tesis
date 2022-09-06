import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalCrearEditarUsuarioComponent} from '../../modales/modal-crear-editar-usuario/modal.crear-editar-usuario.component';
import {CookieUsuarioService} from '../../servicios/cookie.service';
import {ModalCambiarContrasenaComponent} from '../../modales/modal-cambiar-contrasena/modal.cambiar-contrasena.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.component.html',
  styleUrls: ['inicio.component.sass']
})
export class InicioComponent implements OnInit {
  usuario: any;
  migasPan: MenuItem[] = [];
  constructor(private readonly _router: Router,
              private readonly _cookieService: CookieUsuarioService,
              private readonly _dialog: MatDialog,
              // private readonly _toasterService: ToasterService
  ) {
    this.usuario = this._cookieService.recuperarUsuarioCookie('usuario');
  }

  ngOnInit(): void {
    if (this.usuario && this.usuario.contrasena) {
    const modalCrear = this._dialog.open(ModalCambiarContrasenaComponent, {
      width: '500px',
      data: this.usuario
    });
    modalCrear.afterClosed()
      .subscribe(
        (respuestaModalCrear: any) => {
          if (respuestaModalCrear) {
            delete this.usuario.contrasena;
            this._cookieService.destruirUsuarioCookie();
            this._cookieService.guardarUsuarioCookie(this.usuario, 'usuario');
            // this._toasterService.pop('info', 'Correcto', 'Contraseña actualizada correctamente');
          } else {
            this._cookieService.destruirUsuarioCookie();
            this._router.navigate(['login']);
          }
        },
        (error: any) => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }
  }
}
