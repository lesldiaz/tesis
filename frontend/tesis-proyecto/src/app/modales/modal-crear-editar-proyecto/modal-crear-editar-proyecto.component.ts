import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListarProyectosComponent } from 'src/app/componentes/proyectos/listar-proyectos/listar-proyectos.component';

@Component({
  selector: 'app-modal-crear-editar-proyecto',
  templateUrl: './modal-crear-editar-proyecto.component.html',
  styleUrls: ['./modal-crear-editar-proyecto.component.css']
})
export class ModalCrearEditarProyectoComponent implements OnInit {
  proyectoCrearEditar: object | boolean = false;
  tituloModal = false;
  habilitarBotonSubmit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _data: any,
    private readonly _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    if (!this._data) {
      this.proyectoCrearEditar = false;
      this.tituloModal = false;
    } else {
      this.proyectoCrearEditar = this._data;
      this.tituloModal = true;
    }
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    this._dialogRef.close(this.proyectoCrearEditar);
  }

  recibirProyecto($event: object) {
    this.proyectoCrearEditar = $event;
  }

  habilitarBoton($event: boolean) {
    this.habilitarBotonSubmit = $event;
  }

}
