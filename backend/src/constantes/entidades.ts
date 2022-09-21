import {UsuarioEntity} from "../modulos/usuario/usuario.entity";
import {UsuarioSesionEntity} from "../modulos/usuario-sesion/usuario.sesion.entity";
import {ProyectoEntity} from "../modulos/proyecto/proyecto.entity";
import {BloqueEntity} from "src/modulos/bloque/bloque.entity";
import {ResultadoEntity} from "src/modulos/resultado/resultado.entity";
import {RolEntity} from "src/modulos/rol/rol.entity";
import {ParticipanteEntity} from "src/modulos/participante/participante.entity";
import {ParticipanteProyectoEntity} from "src/modulos/participante-proyecto/participante-proyecto.entity";
import {PropositoEntity} from "src/modulos/proposito/proposito.entity";
import {RequerimientoEntity} from "src/modulos/requerimiento/requerimiento.entity";
import {RequerimientoBloqueEntity} from "src/modulos/requerimiento-bloque/requerimiento-bloque.entity";

export const ENTIDADES = [
    UsuarioEntity,
    UsuarioSesionEntity,
    ProyectoEntity,
    BloqueEntity,
    ParticipanteEntity,
    ParticipanteProyectoEntity,
    PropositoEntity,
    RequerimientoEntity,
    RequerimientoBloqueEntity,
    ResultadoEntity,
    RolEntity
]