import {EstadoPipe} from '../pipes/estado.pipe';
import {TituloModalPipe} from '../pipes/titulo-modal.pipe';
import {TituloBotonModalPipe} from '../pipes/titulo-boton-modal.pipe';
import {VerFormularioAsignarRolPipe} from '../pipes/ver-formulario-asignar-rol.pipe';
import {EstadoAprobacionPipe} from '../pipes/estado.aprobacion.pipe';
import {TipoProyectoPipe} from '../pipes/tipo-proyecto.pipe';
import {EstadoProyectoPipe} from '../pipes/estado-proyecto.pipe';
import { PrioridadReqPipe } from '../pipes/prioridad-req.pipe';

export const ARREGLO_PIPES = [
  EstadoPipe,
  TituloModalPipe,
  TituloBotonModalPipe,
  VerFormularioAsignarRolPipe,
  EstadoAprobacionPipe,
  TipoProyectoPipe,
  EstadoProyectoPipe,
  PrioridadReqPipe
];
