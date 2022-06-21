import {ExcelPlantillaHuInterface} from "./interfaces/excel-plantilla-hu.interface";
import * as XLSX from 'xlsx';
import {RequerimientoInterface} from "./interfaces/requerimiento.interface";
import {ExcelPlantillaResInterface} from "./interfaces/excel-plantilla-res.interface";
import {ResultadoInterface} from "./interfaces/resultado.interface";

export const FUNCIONES_GENERALES = {
  queryAObjeto: (objeto: any) => {
    const parts = [];
    for (const key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        const busqueda = JSON.stringify(objeto[key]);
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(busqueda));
      }
    }
    return '?' + parts.join('&');
  },
  tratamientoDatosExcel: (datos: object[]) => {
    const datosTratados: ExcelPlantillaHuInterface[] = [];
    datos.map((valor: any) => {
      const requerimiento: ExcelPlantillaHuInterface = {}
      if (valor['Descripción']) {
        requerimiento.identificador = valor['Identificador'];
        requerimiento.descripcion = valor['Descripción'];
        requerimiento.prioridad = valor['Prioridad'];
        requerimiento.padre = valor['Padre'] ? valor['Padre'] : null;
        requerimiento.correcto = valor['CORRECTO'] ? valor['CORRECTO'] : 0;
        requerimiento.apropiado = valor['APROPIADO'] ? valor['APROPIADO'] : 0;
        requerimiento.verificable = valor['VERIFICABLE'] ? valor['VERIFICABLE'] : 0;
        requerimiento.factible = valor['FACTIBLE'] ? valor['FACTIBLE'] : 0;
        requerimiento.sinAmbiguedad = valor['SIN AMBIGÜEDAD'] ? valor['SIN AMBIGÜEDAD'] : 0;
        requerimiento.singular = valor['SINGULAR'] ? valor['SINGULAR'] : 0;
        requerimiento.trazable = valor['TRAZABILIDAD'] ? valor['TRAZABILIDAD'] : 0;
        requerimiento.modificable = valor['MODIFICABLE'] ? valor['MODIFICABLE'] : 0;
        requerimiento.consistente = valor['CONSISTENTE'] ? valor['CONSISTENTE'] : 0;
        requerimiento.conforme = valor['CONFORME'] ? valor['CONFORME'] : 0;
        requerimiento.necesario = valor['NECESARIO'] ? valor['NECESARIO'] : 0;
        //gameplay
        if (valor['BLOQUES GAMEPLAY']) {
          requerimiento.bloqueGameplay1 = valor['BLOQUES GAMEPLAY'] ? valor['BLOQUES GAMEPLAY'] : 'NINGUNO';
          requerimiento.bloqueGameplay2 = valor['BLOQUES GAMEPLAY2'] ? valor['BLOQUES GAMEPLAY2'] : 'NINGUNO';
          requerimiento.bloqueGameplay3 = valor['BLOQUES GAMEPLAY3'] ? valor['BLOQUES GAMEPLAY3'] : 'NINGUNO';
          requerimiento.bloqueGameplay4 = valor['BLOQUES GAMEPLAY4'] ? valor['BLOQUES GAMEPLAY4'] : 'NINGUNO';
          requerimiento.bloqueGameplay5 = valor['BLOQUES GAMEPLAY5'] ? valor['BLOQUES GAMEPLAY5'] : 'NINGUNO';
          requerimiento.bloqueGameplay6 = valor['BLOQUES GAMEPLAY6'] ? valor['BLOQUES GAMEPLAY6'] : 'NINGUNO';
        }
        datosTratados.push(requerimiento)
      }
    })
    return datosTratados;
  },
  leerPlantillaRequerimientos: (event: any) => {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    let resultado: ExcelPlantillaHuInterface[] = [];
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {range: 5}); // to get 2d array pass 2nd parameter as object {header: 1}
      resultado = FUNCIONES_GENERALES.tratamientoDatosExcel(data as any);
    }
    return resultado; //como metodo no funciona xd
  },
  eliminarElemento: (array: any[], elemento: any) => {
    array.indexOf(elemento) < 0 ? array : array.splice(array.indexOf(elemento), 1);
    return array;
  },
  caracteristicasCumplidasCount: (resultado: ResultadoInterface): number => {
    let caracteristicasNum = 0;
    if (resultado.correcto) {
      caracteristicasNum += 1;
    }
    if (resultado.apropiado) {
      caracteristicasNum += 1;
    }
    if (resultado.completo) {
      caracteristicasNum += 1;
    }
    if (resultado.verificable) {
      caracteristicasNum += 1;
    }
    if (resultado.factible) {
      caracteristicasNum += 1;
    }
    if (resultado.sinAmbiguedad) {
      caracteristicasNum += 1;
    }
    if (resultado.singular) {
      caracteristicasNum += 1;
    }
    if (resultado.trazable) {
      caracteristicasNum += 1;
    }
    if (resultado.modificable) {
      caracteristicasNum += 1;
    }
    if (resultado.consistente) {
      caracteristicasNum += 1;
    }
    if (resultado.conforme) {
      caracteristicasNum += 1;
    }
    if (resultado.necesario) {
      caracteristicasNum += 1;
    }
    return caracteristicasNum;
  },
  generarObjetoResExcel: (requirementos: RequerimientoInterface[]) => {
    const datosExcel: ExcelPlantillaResInterface[] = [];
    requirementos.forEach((requerimiento: RequerimientoInterface) => {
      const objetoExcel: ExcelPlantillaResInterface = {};
      const resultado = (requerimiento.resultado as ResultadoInterface[])[0];
      const numReqValidos = FUNCIONES_GENERALES.caracteristicasCumplidasCount(resultado);
      objetoExcel.idRequerimiento = requerimiento.idRequerimiento as string;
      objetoExcel.descripcion = requerimiento.descripcion;
      objetoExcel.esValido = requerimiento.estado ? 'SI' : 'NO';
      objetoExcel.caracteristicasCumplidas = numReqValidos
      objetoExcel.observaciones = resultado.observaciones;
      datosExcel.push(objetoExcel);
    });
    return datosExcel;
  }

};
