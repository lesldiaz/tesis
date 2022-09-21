import { RequerimientoInterface } from "./requerimiento.interface";

export interface ResultadoInterface {
  id?: number;
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
  observaciones?: string;
  requerimiento?: RequerimientoInterface;
}
