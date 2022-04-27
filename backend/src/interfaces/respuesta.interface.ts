import { RespuestaBuscarInterface } from './respuesta.buscar.interface';

export interface RespuestaInterface<Entidad> {
    mensaje: string | RespuestaBuscarInterface<Entidad>;
    codigoRespuesta: number;
}
