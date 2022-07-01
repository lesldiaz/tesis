import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';
import {RolInterface} from '../constantes/interfaces/rol.interface';

@Injectable()
export class RolService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlRol;
  }

  getAllRoles() {
    return this._httpClient.get(this.url);
  }

  postRol(nuevoRol: RolInterface) {
    return this._httpClient.post(this.url, nuevoRol);
  }

  getRol(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
