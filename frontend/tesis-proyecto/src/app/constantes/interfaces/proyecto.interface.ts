import { DatosUsuarioInterface } from "./datos.usuario.interface";

export interface ProyectoInterface {
  id?: number;
  idProyecto?: string;
  nombre?: string;
  descripcion?: string;
  estado?: 'I' | 'P' | 'F';
  tipoProyecto?: 'C' | 'J';
  duplicado?: 1 | 0;
  createdAt?: string;
  updatedAt?: string;
  usuario?: DatosUsuarioInterface | number;
  requerimientos?: any;
}
