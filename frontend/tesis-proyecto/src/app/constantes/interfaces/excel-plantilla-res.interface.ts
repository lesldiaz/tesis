export interface ExcelPlantillaResInterface {
  idRequerimiento?: string;
  descripcion?: string;
  esValido?: 'YES' | 'NO';
  caracteristicasCumplidas?: number;
  observaciones?: string;
  necesarios?: string;
  noNecesarios?: string;
  deseables?: string;
  noDeseables?: string;
}
