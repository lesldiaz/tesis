import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';

@Injectable()
export class RequerimientoBloqueService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlRequerimientoBloque;
  }

  getAllRequerimientoBloques() {
    return this._httpClient.get(this.url);
  }

  postRequerimientoBloques(nuevoRequerimientoBloque: any) {
    return this._httpClient.post(this.url, nuevoRequerimientoBloque);
  }

  putRequerimientoBloques(nuevoRequerimientoBloque: any, idRequerimientoBloque: number) {
    return this._httpClient.put(this.url + idRequerimientoBloque, nuevoRequerimientoBloque);
  }

  getRequerimientoBloque(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
