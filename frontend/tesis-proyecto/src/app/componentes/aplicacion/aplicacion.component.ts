import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { UsuarioInterface } from 'src/app/constantes/interfaces/usuario.interface';
import {
  ModalCrearEditarProyectoComponent
} from 'src/app/modales/modal-crear-editar-proyecto/modal-crear-editar-proyecto.component';
import { AuthService } from 'src/app/servicios/auth.service';
import {ProyectoService} from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  migasPan: MenuItem[] = [];
  usuarioActual: any;

  constructor(
    private readonly _route: Router,
    private readonly _dialog: MatDialog,
    private readonly _proyectoService: ProyectoService,
    private readonly _authService: AuthService ,
    ) {
  }

  ngOnInit() {
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (this.usuarioActual) {
      this.usuarioActual = this.usuarioActual.id;
    }
    this.migasPan = [
      {
        label: 'App'
      }
    ];
  }

  crearProyecto() {
    const modalCrear = this._dialog.open(ModalCrearEditarProyectoComponent, {
      width: '600px',
      data: false
    });
    modalCrear.afterClosed()
      .subscribe(
        respuestaModalCrear => {
          if (respuestaModalCrear) {
            respuestaModalCrear.usuario = this.usuarioActual;
            respuestaModalCrear.tipoProyecto = respuestaModalCrear.tipoProyecto.codigo;
            this._proyectoService.postProyecto(respuestaModalCrear)
              .subscribe(
                (value: any) => {
                  this._route.navigate(['nuevoproyecto', value.id]);
                },
                error => {
                  console.error('Error al crear proyecto', error);
                }
              );
          }
        },
        error => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }
}
