import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsuarioInterface} from '../constantes/interfaces/usuario.interface';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthService {
  url;
  private currentUserSubject: BehaviorSubject<UsuarioInterface | undefined>;
  public currentUser: Observable<UsuarioInterface | undefined>;

  constructor(private _httpClient: HttpClient) {
    this.url = environment.urlUsuario;
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
      .pipe(map((user: UsuarioInterface | any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
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
