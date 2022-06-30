import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';

@Injectable()
export class BloqueService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlBloque;
  }

  getAllBloques() {
    return this._httpClient.get(this.url);
  }

  postBloques(nuevoBloque: any) {
    return this._httpClient.post(this.url, nuevoBloque);
  }

  putBloques(nuevoBloque: any, idBloque: number) {
    return this._httpClient.put(this.url + idBloque, nuevoBloque);
  }

  getBloque(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
