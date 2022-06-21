import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FUNCIONES_GENERALES} from '../constantes/funciones-generales';
import {ProyectoInterface} from '../constantes/interfaces/proyecto.interface';
import { BusquedaProyectoInterface } from '../constantes/interfaces/busqueda-proyecto.interface';
import { RequerimientoInterface } from '../constantes/interfaces/requerimiento.interface';


@Injectable()
export class RequerimientoService {
  url;

  constructor(
    private readonly _httpClient: HttpClient
  ) {
    this.url = environment.urlRequerimiento;
  }

  getRequerimientos(skip: number, take: number, busqueda?: object) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      const busquedaRequerimientos = FUNCIONES_GENERALES.queryAObjeto(busqueda);
      const pathBusquedaPaginacion = this.url + 'personalizada/busqueda' + busquedaRequerimientos;
      return this._httpClient.get(pathBusquedaPaginacion);
    }
  }

  getRequerimientosFiltro(skip: number, take: number, busqueda?: any) {
    if (!busqueda) {
      const pathPaginacion = this.url + `?skip=${skip}&take=${take}`;
      return this._httpClient.get(pathPaginacion);
    } else {
      if (busqueda.usuario) {
        const busquedaPorUsuario = JSON.stringify(busqueda.usuario);
        delete busqueda.usuario;
        if (Object.keys(busqueda).length > 0){
          const busquedaRequerimiento = FUNCIONES_GENERALES.queryAObjeto(busqueda);
          const pathBusquedaPaginacion = this.url  + busquedaRequerimiento + `&usuario=${busquedaPorUsuario}`+ `&skip=${skip}&take=${take}`;
          return this._httpClient.get(pathBusquedaPaginacion);
        } else {
          const pathBusquedaPaginacion = this.url + `?usuario=${busquedaPorUsuario}`+ `&skip=${skip}&take=${take}`;
          return this._httpClient.get(pathBusquedaPaginacion);
        }
      } else {
        const busquedaCentro = FUNCIONES_GENERALES.queryAObjeto(busqueda);
        const pathBusquedaPaginacion = this.url + busquedaCentro + `&skip=${skip}&take=${take}`;
        return this._httpClient.get(pathBusquedaPaginacion);
      }
    }
  }

  getAllRequerimientos() {
    return this._httpClient.get(this.url);
  }

  postRequerimiento(nuevoRequerimiento: RequerimientoInterface) {
    return this._httpClient.post(this.url, nuevoRequerimiento);
  }

  putRequerimiento(nuevoRequerimiento: RequerimientoInterface, idRequerimiento: number) {
    return this._httpClient.put(this.url + idRequerimiento, nuevoRequerimiento);
  }

  deleteRequerimiento(idRequerimiento: number) {
    return this._httpClient.delete(this.url + idRequerimiento);
  }

  getRequerimiento(id: number) {
    return this._httpClient.get(this.url + id);
  }
}
