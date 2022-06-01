import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';
import {ParticipanteInterface} from '../constantes/interfaces/participante.interface';

@Injectable()
export class ParticipanteService {
  url;
  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlParticipante;
  }

  /*getProfesionales(skip, take, busqueda?: object) {
    if (!busqueda) {
      const pathPaginacion = this.url + `profesional-utilidades/datos?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      if (busqueda['usuario']) {
        const pathBusquedaPaginacion = this.url + `profesional-utilidades/datos?usuario=${busqueda['usuario']}` + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      } else if (busqueda['horario']) {
        const pathBusquedaPaginacion = this.url + `profesional-utilidades/datos?horario=${busqueda['horario']}` + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      } else if (busqueda['servicio']) {
        const pathBusquedaPaginacion = this.url + `profesional-utilidades/datos?servicio=${busqueda['servicio']}` + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      } else {
        const busquedaCentro = FUNCIONES_GENERALES.queryAObjeto(busqueda);
        const pathBusquedaPaginacion = this.url + 'profesional-utilidades/datos' + busquedaCentro + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      }
    }
  }*/

  getAllParticipantes() {
    return this._httpClient.get(this.url);
  }

  postParticipante(nuevoParticipante: ParticipanteInterface) {
    return this._httpClient.post(this.url, nuevoParticipante);
  }

  putParticipante(nuevoParticipante: ParticipanteInterface, idParticipante: number) {
    return this._httpClient.put(this.url + idParticipante, nuevoParticipante);
  }

  getParticipante(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
