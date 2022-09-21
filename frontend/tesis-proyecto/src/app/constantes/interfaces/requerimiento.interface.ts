import { PropositoInterface } from "./proposito.interface";
import { ProyectoInterface } from "./proyecto.interface";
import { RequerimientoBloqueInterface } from "./requerimiento-bloque.interface";
import { ResultadoInterface } from "./resultado.interface";
import { RolInterface } from "./rol.interface";

export interface RequerimientoInterface {
  id?: number;
  idRequerimiento?: string;
  titulo?: string;
  descripcion?: string;
  prioridad?: number;
  estado?: 1 | 0;
  esReqBloque?: 1 | 0;
  rol?: RolInterface | number | string;
  proposito?: PropositoInterface[];
  requerimientoBloque?: RequerimientoBloqueInterface[];
  proyecto?: ProyectoInterface | number;
  resultado?: ResultadoInterface | ResultadoInterface[];
  requerimientoPadre?: string;
  necesarios?: string;
  noNecesarios?: string;
  deseables?: string;
  noDeseables?: string;
}
