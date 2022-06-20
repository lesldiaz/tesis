import { RequerimientoInterface } from "./requerimiento.interface";

export interface ResultadoInterface {
  id: number;
  correcto?: 1 | 0;
  apropiado?: 1 | 0;
  completo?: 1 | 0;
  verificable?: 1 | 0;
  factible?: 1 | 0;
  sinAmbiguedad?: 1 | 0;
  singular?: 1 | 0;
  trazable?: 1 | 0;
  modificable?: 1 | 0;
  consistente?: 1 | 0;
  conforme?: 1 | 0;
  necesario?: 1 | 0;
  observaciones?: string;
  requerimiento?: RequerimientoInterface | number;
}
