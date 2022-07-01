import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';
import {ResultadoInterface} from '../constantes/interfaces/resultado.interface';


@Injectable()
export class ResultadoService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlResultado;
  }

  putResultado(nuevoResultado: ResultadoInterface, idResultado: number) {
    return this._httpClient.put(this.url + idResultado, nuevoResultado);
  }

  getResultado(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
