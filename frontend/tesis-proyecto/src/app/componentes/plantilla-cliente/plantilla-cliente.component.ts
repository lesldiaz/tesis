import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FUNCIONES_GENERALES} from 'src/app/constantes/funciones-generales';
import {ExcelPlantillaHuInterface} from 'src/app/constantes/interfaces/excel-plantilla-hu.interface';
import * as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';

//import * as fs from 'fs';
@Component({
  selector: 'app-plantilla-cliente',
  templateUrl: './plantilla-cliente.component.html',
  styleUrls: ['./plantilla-cliente.component.css']
})
export class PlantillaClienteComponent implements OnInit {
  data: any;
  change: any;
  @Output() requerimientosCargados: EventEmitter<object[]> = new EventEmitter<object[]>();
  nombreArchivo: string = 'Sin Selección';
  resultado: ExcelPlantillaHuInterface[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() label: string='';

  constructor() {
  }

  ngOnInit(): void {
  }

  funcion() {
    this.change = document.getElementById('file-upload');
    this.data = document.getElementById('upload');
    console.log('inicio');
    const value = this.change.value;
    const value2 = value.split('\\');
    console.log(value);
    this.data.value = value2.pop();

  }

  async onFileChange(event: any) {
    this.nombreArchivo = event.target.files[0].name;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {range: 5}); // to get 2d array pass 2nd parameter as object {header: 1}
      this.resultado = FUNCIONES_GENERALES.tratamientoDatosExcel(data as any);
      this.requerimientosCargados.emit(this.resultado);
    }

  }
}
