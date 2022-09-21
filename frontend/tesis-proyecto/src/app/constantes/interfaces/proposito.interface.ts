import { RequerimientoInterface } from "./requerimiento.interface";

export interface PropositoInterface {
  descripcion: string;
  esPrincipal: 1 | 0;
  requerimiento: RequerimientoInterface | number;
}
