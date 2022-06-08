import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListarProyectosComponent } from 'src/app/componentes/proyectos/listar-proyectos/listar-proyectos.component';

@Component({
  selector: 'app-modal-duplicar-proyecto',
  templateUrl: './modal-duplicar-proyecto.component.html',
  styleUrls: ['./modal-duplicar-proyecto.component.css']
})
export class ModalDuplicarProyectoComponent implements OnInit {
  registroDuplicar: object | boolean = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: any,
    private readonly _dialogRef: MatDialogRef<ListarProyectosComponent>
  ) { }

  ngOnInit(): void {
    if (!this._data) {
      this.registroDuplicar = false;
    } else {
      this.registroDuplicar = this._data;
    }
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    this._dialogRef.close(this.registroDuplicar);
  }
}
