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
