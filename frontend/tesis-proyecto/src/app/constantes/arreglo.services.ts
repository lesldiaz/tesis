import { ConfirmationService } from "primeng/api";
import { AuthService } from "../servicios/auth.service";
import { CookieUsuarioService } from "../servicios/cookie.service";
import { ParticipanteService } from "../servicios/participante.service";
import { ProyectoService } from "../servicios/proyecto.service";
import { RequerimientoService } from "../servicios/requerimiento.service";
import { ResultadoService } from "../servicios/resultado.service";
import { RolService } from "../servicios/rol.service";
import { UsuarioSesionService } from "../servicios/usuario-sesion.service";
import { UsuarioService } from "../servicios/usuario.service";

export const ARREGLO_SERVICIOS = [
  ConfirmationService,
  UsuarioService,
  CookieUsuarioService,
  ParticipanteService,
  ProyectoService,
  ResultadoService,
  RequerimientoService,
  AuthService,
  RolService,
  UsuarioSesionService
]
