import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FUNCIONES_GENERALES} from 'src/app/constantes/funciones-generales';
import {ExcelPlantillaResInterface} from 'src/app/constantes/interfaces/excel-plantilla-res.interface';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import * as FileSaver from 'file-saver';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  @Input() tipoProyecto: 'C' | 'J' | undefined;
  @Input() idProyecto: number | undefined;
  requerimientos: RequerimientoInterface[] = [];
  requerimientosCliente: RequerimientoInterface[] = [];
  requerimientosGamePlay: RequerimientoInterface[] = [];
  cols: any[] = [
    {field: 'idRequerimiento', header: 'Identifier'},
    {field: 'descripcion', header: 'Description'},
    {field: 'esValido', header: 'Is Valid'},
    {field: 'caracteristicasCumplidas', header: 'Fulfilled properties'},
    {field: 'observaciones', header: 'Observations'},
  ];

  constructor(
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService,
    private readonly _route: Router,
  ) {
  }

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
            this.requerimientos.forEach(requerimiento => {
              console.log(requerimiento);
              const resultados = (requerimiento.resultado as ResultadoInterface[])[0];
              const validacionImplementacion = resultados?.necesario;
              const reqIndispensablesCumplidos: string[] = [];
              const reqIndispensablesNoCumplidos: string[] = [];
              if (resultados?.correcto) {
                reqIndispensablesCumplidos.push('Correct');
              } else {
                reqIndispensablesNoCumplidos.push('Correct');
              }
              if (resultados?.apropiado) {
                reqIndispensablesCumplidos.push('Appropiate');
              } else {
                reqIndispensablesNoCumplidos.push('Appropiate');
              }
              if (resultados?.completo) {
                reqIndispensablesCumplidos.push('Complete');
              } else {
                reqIndispensablesNoCumplidos.push('Complete');
              }
              if (resultados?.verificable) {
                reqIndispensablesCumplidos.push('Verifiable');
              } else {
                reqIndispensablesNoCumplidos.push('Verifiable');
              }
              if (resultados?.factible) {
                reqIndispensablesCumplidos.push('Feasible');
              } else {
                reqIndispensablesNoCumplidos.push('Feasible');
              }
              const reqDeseablesCumplidos: string[] = [];
              const reqDeseablesNoCumplidos: string[] = [];
              if (resultados?.sinAmbiguedad) {
                reqDeseablesCumplidos.push('Unambiguous');
              } else {
                reqDeseablesNoCumplidos.push('Unambiguous');
              }
              if (resultados?.singular) {
                reqDeseablesCumplidos.push('Singular');
              } else {
                reqDeseablesNoCumplidos.push('Singular');
              }
              if (resultados?.trazable) {
                reqDeseablesCumplidos.push('Traceable');
              } else {
                reqDeseablesNoCumplidos.push('Traceable');
              }
              if (resultados?.modificable) {
                reqDeseablesCumplidos.push('Modifiable');
              } else {
                reqDeseablesNoCumplidos.push('Modifiable');
              }
              if (resultados?.consistente) {
                reqDeseablesCumplidos.push('Consistent');
              } else {
                reqDeseablesNoCumplidos.push('Consistent');
              }
              if (resultados?.conforme) {
                reqDeseablesCumplidos.push('Conforming');
              } else {
                reqDeseablesNoCumplidos.push('Conforming');
              }

              requerimiento.necesarios = reqIndispensablesCumplidos.join(', ');
              requerimiento.noNecesarios = reqIndispensablesNoCumplidos.join(', ');
              requerimiento.deseables = reqDeseablesCumplidos.join(', ');
              requerimiento.noDeseables = reqDeseablesNoCumplidos.join(', ');
              console.log(requerimiento);
              if (requerimiento.esReqBloque) {
                this.requerimientosGamePlay.push(requerimiento);
              } else {
                this.requerimientosCliente.push(requerimiento);
              }
            });
            this.requerimientos = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientos);
            this.requerimientosCliente = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientosCliente);
            this.requerimientosGamePlay = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientosGamePlay);
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

  exportExcel(tipo: 'C' | 'J' = 'C') {
    import("xlsx").then(xlsx => {
      const cabecera = [
        ["Identifier", "Description", "Valid", "Fulfilled properties", "Observations"]
      ];
      let worksheet;
      let nombreArchivo;
      if (tipo === 'C') {
        nombreArchivo = 'resultsClient';
        worksheet = xlsx.utils.json_to_sheet(this.requerimientosCliente);
        xlsx.utils.sheet_add_aoa(worksheet, cabecera);
        xlsx.utils.sheet_add_json(worksheet, this.requerimientosCliente, {origin: 'A2', skipHeader: true});
      } else {
        nombreArchivo = 'resultsGamePlay';
        worksheet = xlsx.utils.json_to_sheet(this.requerimientosGamePlay);
        xlsx.utils.sheet_add_aoa(worksheet, cabecera);
        xlsx.utils.sheet_add_json(worksheet, this.requerimientosGamePlay, {origin: 'A2', skipHeader: true});
      }
      const workbook = {Sheets: {'Output': worksheet}, SheetNames: ['Output']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, nombreArchivo);
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
