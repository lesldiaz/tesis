import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { UsuarioInterface } from 'src/app/constantes/interfaces/usuario.interface';
import { ModalCambiarContrasenaComponent } from 'src/app/modales/modal-cambiar-contrasena/modal.cambiar-contrasena.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  migasPan: MenuItem[]=[];
  usuarioActual: UsuarioInterface | undefined;
  idUsuarioActual: number | any;
  nombreUsuario = 'Invitado';

  constructor(
    private readonly _authService: AuthService,
    private readonly _usuarioService: UsuarioService,
    private readonly _toasterService: ToastrService,
    private readonly _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.migasPan = [
      {
          label: 'Perfil del Usuario'
      }
    ];
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (this.usuarioActual) {
      this.nombreUsuario = this.usuarioActual.nombreUsuario;
      this.idUsuarioActual = this.usuarioActual.id;
    }
  }

  modalContrasena() {
      const modalDuplicar = this._dialog.open(ModalCambiarContrasenaComponent, {
        width: '400px',
        data: false
      });
      modalDuplicar.afterClosed()
        .subscribe(
          contrasena => {
            if (contrasena) {
              this._usuarioService.putUsuarios({contrasena}, this.idUsuarioActual)
                .subscribe(
                  value => {
                    this._toasterService.success('Contraseña actualizada correctamente', 'Éxito');
                  },
                  error => {
                    this._toasterService.error('Ocurrió un error al actualizar la contraseña', 'Error');
                    console.error('Error al cambiar contraseña', error);
                  }
                );
            }
          },
          error => {
            console.error('Error al cerrar modal duplicar', error);
          }
        );
    }
}
