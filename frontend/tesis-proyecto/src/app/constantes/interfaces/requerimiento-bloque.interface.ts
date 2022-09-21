import { RequerimientoInterface } from "./requerimiento.interface";
import { BloqueInterface } from "./bloque.interface";

export interface RequerimientoBloqueInterface {
  id?: number;
  bloque?: number | BloqueInterface;
  requerimiento?: number | RequerimientoInterface;
}
