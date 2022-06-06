import { CookieUsuarioService } from "../servicios/cookie.service";
import { ParticipanteService } from "../servicios/participante.service";
import { ProyectoService } from "../servicios/proyecto.service";
import { UsuarioService } from "../servicios/usuario.service";

export const ARREGLO_SERVICIOS = [
  UsuarioService,
  CookieUsuarioService,
  ParticipanteService,
  ProyectoService
]
