import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsuarioInterface} from '../constantes/interfaces/usuario.interface';
import {environment} from 'src/environments/environment';
import {UsuarioSesionService} from './usuario-sesion.service';
import { WINDOW } from './token-hostname';

@Injectable()
export class AuthService {
  url;
  urlSesion;
  origin = this.window.location.origin;
  private currentUserSubject: BehaviorSubject<UsuarioInterface | undefined>;
  public currentUser: Observable<UsuarioInterface | undefined>;

  constructor(
    @Inject(WINDOW) private window: Window,
    private readonly _httpClient: HttpClient,
  ) {
    this.url = environment.urlUsuario;
    //this.url = origin + environment.urlUsuario;
    this.urlSesion = environment.urlUsuarioSesion;
    this.currentUserSubject = new BehaviorSubject<UsuarioInterface | undefined>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UsuarioInterface | undefined {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this._httpClient.post(this.url + 'auth',
      {
        nombreUsuario: username,
        contrasena: password
      })
      .pipe(map( (user: UsuarioInterface | any) => {
        delete user['contrasena'];
        delete user['createdAt'];
        delete user['updatedAt'];
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}
