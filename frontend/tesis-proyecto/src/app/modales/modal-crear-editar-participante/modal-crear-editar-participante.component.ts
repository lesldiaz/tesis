import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListarParticipantesComponent } from 'src/app/componentes/participantes/listar/listar-participantes.component';

@Component({
  selector: 'app-modal-crear-editar-participante',
  templateUrl: './modal-crear-editar-participante.component.html',
  styleUrls: ['./modal-crear-editar-participante.component.css']
})
export class ModalCrearEditarParticipanteComponent implements OnInit {
  participanteCrearEditar: object | boolean = {};
  habilitarBotonSubmit = false;
  constructor(@Inject(MAT_DIALOG_DATA) private readonly _data: any,
              private readonly _dialogRef: MatDialogRef<ListarParticipantesComponent>) {
  }
  ngOnInit(): void {
    if (!this._data) {
      this.participanteCrearEditar = false;
    } else {
      this.participanteCrearEditar = this._data;
    }
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    this._dialogRef.close(this.participanteCrearEditar);
  }

  recibirParticipante($event: object) {
    this.participanteCrearEditar = $event;
  }

  habilitarBoton($event: boolean) {
    this.habilitarBotonSubmit = $event;
  }
}
