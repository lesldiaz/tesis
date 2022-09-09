export interface ExcelPlantillaExportInterface {
  identificador?: string;
  titulo?: string;
  descripcion?: string;
  prioridad?: number;
  rol?: string;
  padre?: string; //requerimientoPadre
  bloque?: string; //requerimientoBloque
  proposito?: string;
  correcto?: number;
  apropiado?: number;
  completo?: number;
  verificable?: number;
  factible?: number;
  sinAmbiguedad?: number;
  singular?: number;
  trazable?: number;
  modificable?: number;
  consistente?: number;
  conforme?: number;
  necesario?: number;
}
