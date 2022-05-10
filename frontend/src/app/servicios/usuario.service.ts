import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';

@Injectable()
export class UsuarioService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlUsuario;
  }

  getUsuarios(skip, take, busqueda?: object) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      const pathBusquedaPaginacion = this.url + FUNCIONES_GENERALES.queryAObjeto(busqueda) + `&skip=${skip}&take=${take}`;
      return this._httpClient.get(pathBusquedaPaginacion);
    }
  }

  getAllUsuarios() {
      return this._httpClient.get(this.url);
  }

  postUsuarios(nuevoUsuario) {
    return this._httpClient.post(this.url, nuevoUsuario);
  }

  putUsuarios(nuevoUsuario, idUsuario) {
    return this._httpClient.put(this.url + idUsuario, nuevoUsuario);
  }

  getUsuario(id) {
    return this._httpClient.get(this.url + id);
  }
}
