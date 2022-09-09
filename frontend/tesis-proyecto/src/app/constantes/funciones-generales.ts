import {ExcelPlantillaHuInterface} from "./interfaces/excel-plantilla-hu.interface";
import * as XLSX from 'xlsx';
import {RequerimientoInterface} from "./interfaces/requerimiento.interface";
import {ExcelPlantillaResInterface} from "./interfaces/excel-plantilla-res.interface";
import {ResultadoInterface} from "./interfaces/resultado.interface";
import {ExcelPlantillaExportInterface} from "./interfaces/excel-plantilla-export.interface";
import {RequerimientoBloqueInterface} from "./interfaces/requerimiento-bloque.interface";
import {PropositoInterface} from "./interfaces/proposito.interface";
import {BloqueInterface} from "./interfaces/bloque.interface";
import {RolInterface} from "./interfaces/rol.interface";
import {ProyectoInterface} from "./interfaces/proyecto.interface";

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
      if (valor['DESCRIPTION']) {
        requerimiento.identificador = valor['IDENTIFIER'];
        requerimiento.descripcion = valor['DESCRIPTION'];
        requerimiento.correcto = valor['CORRECT'] ? valor['CORRECT'] : 0;
        requerimiento.apropiado = valor['APPROPRIATE'] ? valor['APPROPRIATE'] : 0;
        requerimiento.verificable = valor['VERIFIABLE'] ? valor['VERIFIABLE'] : 0;
        requerimiento.factible = valor['FEASIBLE'] ? valor['FEASIBLE'] : 0;
        requerimiento.sinAmbiguedad = valor['UNAMBIGUOUS'] ? valor['UNAMBIGUOUS'] : 0;
        requerimiento.singular = valor['SINGULAR'] ? valor['SINGULAR'] : 0;
        requerimiento.trazable = valor['TRACEABLE'] ? valor['TRACEABLE'] : 0;
        requerimiento.modificable = valor['MODIFIABLE'] ? valor['MODIFIABLE'] : 0;
        requerimiento.consistente = valor['CONSISTENT'] ? valor['CONSISTENT'] : 0;
        requerimiento.conforme = valor['CONFORMING'] ? valor['CONFORMING'] : 0;
        requerimiento.necesario = valor['NECESSARY'] ? valor['NECESSARY'] : 0;
        requerimiento.completo = valor['COMPLETE'] ? valor['COMPLETE'] : 0;
        datosTratados.push(requerimiento)
      }
    })
    return datosTratados;
  },
  tratamientoDatosExcelRequerimiento: (datos: object[]) => {
    const datosTratados: ExcelPlantillaExportInterface[] = [];
    datos.map((valor: any) => {
      const requerimiento: ExcelPlantillaExportInterface = {}
      if (valor['DESCRIPTION']) {
        requerimiento.identificador = valor['IDENTIFIER'];
        requerimiento.titulo = valor['TITLE'] !== 'NONE' ? valor['TITLE'] : undefined;
        requerimiento.descripcion = valor['DESCRIPTION'];
        requerimiento.prioridad = valor['PRIORITY'];
        requerimiento.rol = valor['ROLE'] !== 'NONE' ? valor['ROLE'] : undefined;
        requerimiento.padre = valor['PARENT'] !== 'NONE' ? valor['PARENT'] : undefined;
        requerimiento.correcto = valor['CORRECT'] ? valor['CORRECT'] : 0;
        requerimiento.apropiado = valor['APPROPRIATE'] ? valor['APPROPRIATE'] : 0;
        requerimiento.completo = valor['COMPLETE'] ? valor['COMPLETE'] : 0;
        requerimiento.verificable = valor['VERIFIABLE'] ? valor['VERIFIABLE'] : 0;
        requerimiento.factible = valor['FEASIBLE'] ? valor['FEASIBLE'] : 0;
        requerimiento.sinAmbiguedad = valor['UNAMBIGUOUS'] ? valor['UNAMBIGUOUS'] : 0;
        requerimiento.singular = valor['SINGULAR'] ? valor['SINGULAR'] : 0;
        requerimiento.trazable = valor['TRACEABLE'] ? valor['TRACEABLE'] : 0;
        requerimiento.modificable = valor['MODIFIABLE'] ? valor['MODIFIABLE'] : 0;
        requerimiento.consistente = valor['CONSISTENT'] ? valor['CONSISTENT'] : 0;
        requerimiento.conforme = valor['CONFORMING'] ? valor['CONFORMING'] : 0;
        requerimiento.necesario = valor['NECESSARY'] ? valor['NECESSARY'] : 0;
        requerimiento.proposito = valor['PURPOSES'];
        requerimiento.bloque = valor['BLOCKS'];
        requerimiento.bloque !== 'NONE' ?
          requerimiento.esReqBloque = 1 :
          requerimiento.esReqBloque = 0;


        datosTratados.push(requerimiento)
      }
    })
    return datosTratados;
  },
  tratamientoDatosExcelProyecto: (datos: object[]) => {
    const proyectoExcel = datos[0] as any;
    const proyecto: ProyectoInterface = {};
    proyecto.tipoProyecto = proyectoExcel['PROJECT TYPE'];
    proyecto.duplicado = proyectoExcel['IS DUPLICATED'];
    proyecto.nombre = proyectoExcel['NAME'];
    proyecto.descripcion = proyectoExcel['DESCRIPTION'] !== 'NONE' ? proyectoExcel['DESCRIPTION'] : delete proyecto.descripcion;
    return proyecto;
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
      objetoExcel.esValido = requerimiento.estado ? 'YES' : 'NO';
      objetoExcel.caracteristicasCumplidas = numReqValidos
      objetoExcel.observaciones = resultado.observaciones;
      datosExcel.push(objetoExcel);
    });
    return datosExcel;
  },
  generarObjetoExport: (requirementos: RequerimientoInterface[]) => {
    const datosExport: ExcelPlantillaResInterface[] = [];
    requirementos.forEach((requerimiento: RequerimientoInterface) => {
      const objetoExcel: ExcelPlantillaExportInterface = {};
      const resultado = (requerimiento.resultado as ResultadoInterface[])[0];
      objetoExcel.identificador = requerimiento.idRequerimiento as string;
      objetoExcel.titulo = requerimiento.titulo ? requerimiento.titulo : "NONE";
      objetoExcel.descripcion = requerimiento.descripcion;
      objetoExcel.prioridad = requerimiento.prioridad;
      if (requerimiento.rol) {
        objetoExcel.rol = (requerimiento.rol as RolInterface).id ? (requerimiento.rol as RolInterface)?.id?.toString() : "NONE";
      } else {
        objetoExcel.rol = "NONE";
      }

      objetoExcel.padre = requerimiento.requerimientoPadre ? requerimiento.requerimientoPadre.toString() : "NONE";
      const bloques = requerimiento.requerimientoBloque as RequerimientoBloqueInterface[];
      if (bloques.length > 0) {
        const bloquesExp: string[] = [];
        bloques.forEach(bloqueE => {
          const bloqueN = bloqueE.bloque as BloqueInterface;
          bloquesExp.push(bloqueN.nombre as string);
        });
        objetoExcel.bloque = bloquesExp.join(',');
      } else {
        objetoExcel.bloque = "NONE";
      }
      const propositos = requerimiento.proposito as PropositoInterface[];
      if (propositos.length > 0) {
        const propositosExp: string[] = [];
        propositos.forEach(proposito => {
          propositosExp.push(proposito.descripcion);
        });
        objetoExcel.proposito = propositosExp.join(';');
      } else {
        objetoExcel.proposito = "NONE";
      }
      //caracteristicas
      objetoExcel.correcto = resultado.correcto;
      objetoExcel.apropiado = resultado.apropiado;
      objetoExcel.completo = resultado.completo;
      objetoExcel.verificable = resultado.verificable;
      objetoExcel.factible = resultado.factible;
      objetoExcel.sinAmbiguedad = resultado.sinAmbiguedad;
      objetoExcel.singular = resultado.singular;
      objetoExcel.trazable = resultado.trazable;
      objetoExcel.modificable = resultado.modificable;
      objetoExcel.consistente = resultado.consistente;
      objetoExcel.conforme = resultado.conforme;
      objetoExcel.necesario = resultado.necesario;

      datosExport.push(objetoExcel);
    });
    return datosExport;
  },
  generarLightColorHex: () => {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
  },
};
