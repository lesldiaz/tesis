import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import { ExcelPlantillaHuInterface } from 'src/app/constantes/interfaces/excel-plantilla-hu.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-plantilla-juego',
  templateUrl: './plantilla-juego.component.html',
  styleUrls: ['./plantilla-juego.component.css']
})
export class PlantillaJuegoComponent implements OnInit {
  @Output() requerimientosCargadosJ: EventEmitter<object[]> = new EventEmitter<object[]>();
  nombreArchivo = 'No Selection';
  nroReqCargados = 0;
  resultado: ExcelPlantillaHuInterface[] = [];
  constructor() { }

  ngOnInit(): void {
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
      console.log(this.resultado);
      this.nroReqCargados = this.resultado.length;
      this.requerimientosCargadosJ.emit(this.resultado);
    }
    console.log("file juego");
  }
}
