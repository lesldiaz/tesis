import { RequerimientoInterface } from "./requerimiento.interface";

export interface PropositoInterface {
  descripción: string;
  esPrincipal: 1 | 0;
  requerimiento: RequerimientoInterface | number;
}
