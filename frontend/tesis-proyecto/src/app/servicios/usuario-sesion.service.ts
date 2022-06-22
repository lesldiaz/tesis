import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';

@Injectable()
export class UsuarioSesionService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlUsuarioSesion;
  }

  getAllSesionUsuario() {
    return this._httpClient.get(this.url);
  }

  postSesionUsuarios(nuevoUsuario: any) {
    return this._httpClient.post(this.url+'custom', nuevoUsuario);
  }

  putSesionUsuarios(nuevoUsuario: any, idUsuario: number) {
    return this._httpClient.put(this.url + idUsuario, nuevoUsuario);
  }

  getSesionUsuario(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
