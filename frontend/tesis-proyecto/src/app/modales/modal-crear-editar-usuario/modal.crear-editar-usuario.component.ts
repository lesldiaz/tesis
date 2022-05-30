import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarUsuarioComponent} from '../../componentes/usuario/listar/listar.usuario.component';

@Component({
  selector: 'app-modal-crear-editar-usuario',
  templateUrl: 'modal.crear-editar-usuario.component.html',
  styleUrls: ['modal.crear-editar-usuario.component.sass']
})
export class ModalCrearEditarUsuarioComponent implements OnInit {
  usuarioCrearEditar: object | boolean = {};
  habilitarBotonSubmit = false;
  constructor(@Inject(MAT_DIALOG_DATA) private readonly _data: any,
              private readonly _dialogRef: MatDialogRef<ListarUsuarioComponent>) {
  }
  ngOnInit(): void {
    if (!this._data) {
      this.usuarioCrearEditar = false;
    } else {
      this.usuarioCrearEditar = this._data;
    }
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    this._dialogRef.close(this.usuarioCrearEditar);
  }

  recibirUsuario($event: object) {
    this.usuarioCrearEditar = $event;
  }

  habilitarBoton($event: boolean) {
    this.habilitarBotonSubmit = $event;
  }
}
