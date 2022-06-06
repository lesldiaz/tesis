import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {
  registroEliminar: object | boolean = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: any,
    private readonly _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    if (!this._data) {
      this.registroEliminar = false;
    } else {
      this.registroEliminar = this._data;
    }
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    this._dialogRef.close(this.registroEliminar);
  }

}
