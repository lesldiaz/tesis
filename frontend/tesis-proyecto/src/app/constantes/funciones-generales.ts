import { ExcelPlantillaHuInterface } from "./interfaces/excel-plantilla-hu.interface";
import * as XLSX from 'xlsx';

export const FUNCIONES_GENERALES = {
  queryAObjeto: (objeto: any) => {
    const parts = [];
    for (const key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]));
      }
    }
    return '?' + parts.join('&');
  },
  tratamientoDatosExcel:(datos: object[])=> {
    const datosTratados: ExcelPlantillaHuInterface[] = [];
    datos.map((valor: any) => {
      const requerimiento: ExcelPlantillaHuInterface = {}
      if(valor['Descripción']){
        requerimiento.identificador = valor['Identificador'];
        requerimiento.descripcion = valor['Descripción'];
        requerimiento.prioridad = valor['Prioridad'];
        requerimiento.padre = valor['Padre']? valor['Padre']: null;
        requerimiento.correcto = valor['CORRECTO']? valor['CORRECTO']: 0;
        requerimiento.apropiado = valor['APROPIADO']? valor['APROPIADO']: 0;
        requerimiento.verificable = valor['VERIFICABLE']? valor['VERIFICABLE']: 0;
        requerimiento.factible = valor['FACTIBLE']? valor['FACTIBLE']: 0;
        requerimiento.sinAmbiguedad = valor['SIN AMBIGÜEDAD']? valor['SIN AMBIGÜEDAD']: 0;
        requerimiento.singular = valor['SINGULAR']? valor['SINGULAR']: 0;
        requerimiento.trazable = valor['TRAZABILIDAD']? valor['TRAZABILIDAD']: 0;
        requerimiento.modificable = valor['MODIFICABLE']? valor['MODIFICABLE']: 0;
        requerimiento.consistente = valor['CONSISTENTE']? valor['CONSISTENTE']: 0;
        requerimiento.conforme = valor['CONFORME']? valor['CONFORME']: 0;
        requerimiento.necesario = valor['NECESARIO']? valor['NECESARIO']: 0;
        //gameplay
        if (valor['BLOQUES GAMEPLAY']){
          requerimiento.bloqueGameplay1 = valor['BLOQUES GAMEPLAY']? valor['BLOQUES GAMEPLAY']: 'NINGUNO';
          requerimiento.bloqueGameplay2 = valor['BLOQUES GAMEPLAY2']? valor['BLOQUES GAMEPLAY2']: 'NINGUNO';
          requerimiento.bloqueGameplay3 = valor['BLOQUES GAMEPLAY3']? valor['BLOQUES GAMEPLAY3']: 'NINGUNO';
          requerimiento.bloqueGameplay4 = valor['BLOQUES GAMEPLAY4']? valor['BLOQUES GAMEPLAY4']: 'NINGUNO';
          requerimiento.bloqueGameplay5 = valor['BLOQUES GAMEPLAY5']? valor['BLOQUES GAMEPLAY5']: 'NINGUNO';
          requerimiento.bloqueGameplay6 = valor['BLOQUES GAMEPLAY6']? valor['BLOQUES GAMEPLAY6']: 'NINGUNO';
        }
        datosTratados.push(requerimiento)
      }
    })
    return datosTratados;
  },
  leerPlantillaRequerimientos: (event: any) => {
    //onFileChange(event: any)
    //<input type="file" (change)="onFileChange($event)">
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    let resultado: ExcelPlantillaHuInterface[]=[];
     reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {range: 5}); // to get 2d array pass 2nd parameter as object {header: 1}
      resultado = FUNCIONES_GENERALES.tratamientoDatosExcel(data as any);
    }
    return resultado; //como metodo no funciona xd
  }
};
