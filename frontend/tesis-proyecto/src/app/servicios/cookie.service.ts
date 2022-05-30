import {CookieService} from 'ngx-cookie';
import {Injectable} from '@angular/core';

@Injectable()
export class CookieUsuarioService {
  constructor(private readonly _cookieService: CookieService) {

  }

  guardarUsuarioCookie(datosAGuardar: object, llave: string) {
    const datosUsuario: string = JSON.stringify(datosAGuardar);
    this._cookieService.put(llave, datosUsuario);
  }

  recuperarUsuarioCookie(llave: string) {
    const usuarioLogeado = this._cookieService.get(llave);
    if (usuarioLogeado) {
      return JSON.parse(usuarioLogeado);
    } else {
      return undefined;
    }
  }

  destruirUsuarioCookie() {
    this._cookieService.removeAll();
  }
}
