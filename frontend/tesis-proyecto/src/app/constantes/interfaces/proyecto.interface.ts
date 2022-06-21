import { DatosUsuarioInterface } from "./datos.usuario.interface";

export interface ProyectoInterface {
  idProyecto?: string;
  nombre?: string;
  descripcion?: string;
  estado?: 'I' | 'P' | 'F';
  tipoProyecto?: 'C' | 'J';
  duplicado?: 1 | 0;
  usuario?: DatosUsuarioInterface | number;
}
