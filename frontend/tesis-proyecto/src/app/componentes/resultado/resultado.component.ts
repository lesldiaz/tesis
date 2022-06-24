import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import { ExcelPlantillaResInterface } from 'src/app/constantes/interfaces/excel-plantilla-res.interface';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { ResultadoInterface } from 'src/app/constantes/interfaces/resultado.interface';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  requerimientos: RequerimientoInterface[] = [];
  requerimientosClonados: ExcelPlantillaResInterface[] = [];
  cols: any[] = [
    {field: 'idRequerimiento', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'esValido', header: 'Es Válido'},
    {field: 'caracteristicasCumplidas', header: 'Características Cumplidas'},
    {field: 'observaciones', header: 'Observaciones'},
  ];
  constructor(
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService,
    private readonly _route: Router,
  ) { }

  ngOnInit(): void {
    const criterioBusqueda = {
      proyecto: {
        id: this.idProyecto
      }
    };
    let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getProyectos$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            this.requerimientos = proyectos.mensaje.resultado;
            this.requerimientosClonados = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientos);
          }
          /* this.requerimientos.map(requerimiento => {
             requerimiento.resultado = (requerimiento.resultado as ResultadoInterface[])[0];
           })*/
          //this.total = proyectos.mensaje.totalResultados;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const cabecera = [
        ["Identificador", "Descripción", "Válido", "Características Cumplidas", "Observaciones"]
      ];
      const worksheet = xlsx.utils.json_to_sheet(this.requerimientosClonados);
      //['!cols'] = [{ width: 20 }, { width: 20 }, { width: 150 } ];
      xlsx.utils.sheet_add_aoa(worksheet, cabecera);
      xlsx.utils.sheet_add_json(worksheet, this.requerimientosClonados, { origin: 'A2', skipHeader: true });
      const workbook = { Sheets: { 'Resultado': worksheet }, SheetNames: ['Resultado'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "resultados");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
