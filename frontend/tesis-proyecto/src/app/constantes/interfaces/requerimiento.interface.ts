import { ProyectoInterface } from "./proyecto.interface";
import { ResultadoInterface } from "./resultado.interface";

export interface RequerimientoInterface {
  id: number;
  idRequerimiento?: string;
  titulo: string;
  descripcion: string;
  prioridad?: number;
  estado?: 1 | 0;
  rol: Object | number;
  proyecto: ProyectoInterface | number;
  resultado: ResultadoInterface | number;
  requerimientoPadre?: number;
}
