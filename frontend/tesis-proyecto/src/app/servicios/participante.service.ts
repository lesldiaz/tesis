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

  getParticipantes(skip: number, take: number, busqueda?: object) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      const busquedaParticipantes = FUNCIONES_GENERALES.queryAObjeto(busqueda);
      const pathBusquedaPaginacion = this.url + 'personalizada/busqueda' + busquedaParticipantes;
      return this._httpClient.get(pathBusquedaPaginacion);
    }
  }

  getAllParticipantes() {
    return this._httpClient.get(this.url);
  }

  postParticipante(nuevoParticipante: ParticipanteInterface) {
    return this._httpClient.post(this.url, nuevoParticipante);
  }

  putParticipante(nuevoParticipante: ParticipanteInterface, idParticipante: number) {
    return this._httpClient.put(this.url + idParticipante, nuevoParticipante);
  }

  deleteParticipante(idParticipante: number) {
    return this._httpClient.delete(this.url + idParticipante);
  }

  getParticipante(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
