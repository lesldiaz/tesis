import { UsuarioInterface } from "./usuario.interface";

export interface UsuarioSesionInterface {
  usuario?: UsuarioInterface;
  fechaInicioSesionActual?: string;
  fechaInicioSesionAnterior?: string;

}
