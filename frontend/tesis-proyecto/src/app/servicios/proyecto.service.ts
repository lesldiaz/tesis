import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';
import {ProyectoInterface} from '../constantes/interfaces/proyecto.interface';
import {BusquedaProyectoInterface} from '../constantes/interfaces/busqueda-proyecto.interface';


@Injectable()
export class ProyectoService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlProyecto;
  }

  getProyectos(skip: number, take: number, busqueda?: object) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      const busquedaProyectos = FUNCIONES_GENERALES.queryAObjeto(busqueda);
      const pathBusquedaPaginacion = this.url + 'personalizada/busqueda' + busquedaProyectos;
      return this._httpClient.get(pathBusquedaPaginacion);
    }
  }

  getProyectosFiltro(skip: number, take: number, busqueda?: BusquedaProyectoInterface) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      if (busqueda.usuario) {
        const busquedaPorUsuario = JSON.stringify(busqueda.usuario);
        delete busqueda.usuario;
        if (Object.keys(busqueda).length > 0) {
          const busquedaProyecto = FUNCIONES_GENERALES.queryAObjeto(busqueda);
          const pathBusquedaPaginacion = this.url + busquedaProyecto + `&usuario=${busquedaPorUsuario}` + `&skip=${skip}&take=${take}`;
          return this._httpClient.get(pathBusquedaPaginacion);
        } else {
          const pathBusquedaPaginacion = this.url + `?usuario=${busquedaPorUsuario}` + `&skip=${skip}&take=${take}`;
          return this._httpClient.get(pathBusquedaPaginacion);
        }
      } else {
        const busquedaCentro = FUNCIONES_GENERALES.queryAObjeto(busqueda);
        const pathBusquedaPaginacion = this.url + busquedaCentro + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      }
    }
  }

  getAllProyectos() {
    return this._httpClient.get(this.url);
  }

  postProyecto(nuevoProyecto: ProyectoInterface) {
    return this._httpClient.post(this.url, nuevoProyecto);
  }
  getDatosInforme(proyecto: any) {
    return this._httpClient.post(this.url + 'generar-datos-informe', proyecto);
  }
  postDuplicarProyecto(nuevoProyecto: ProyectoInterface) {
    return this._httpClient.post(this.url + "duplicar-proyecto", nuevoProyecto);
  }

  putProyecto(nuevoProyecto: ProyectoInterface, idProyecto: number) {
    return this._httpClient.put(this.url + idProyecto, nuevoProyecto);
  }

  deleteProyecto(idProyecto: number) {
    return this._httpClient.delete(this.url + idProyecto);
  }

  getProyecto(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
