import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, first} from 'rxjs/operators';
import {UsuarioService} from '../../servicios/usuario.service';
import {CookieUsuarioService} from '../../servicios/cookie.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from 'src/app/servicios/auth.service';
import {UsuarioSesionService} from 'src/app/servicios/usuario-sesion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  errorIniciarSesion = false;
  usuarios: any [] = [];
  arregloMensajesErrorCampoContrasenia: string [] = [];
  arregloMensajesErrorCampoNombreUsuario: string [] = [];
  mensajesErrorCampoContrasenia = {
    required: 'El campo contraseña es requerido',
  };
  mensajesErrorCampoNombreUsuario = {
    required: 'El campo nombre de usuario es requerido',
    // validacionCedulaYaExiste: 'No existe un usuario registrado con esa cedula'
  };

  formularioValido: boolean = false;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _usuarioSesionService: UsuarioSesionService,
    private _authService: AuthService,
    private readonly _route: Router
  ) {
    this.formularioLogin = new FormGroup({
      nombreUsuario: new FormControl('', [
        Validators.required,
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {
    this.escucharCambiosCampoNombreUsuario();
    this.escucharCambiosCampoContrasenia();
    this.escucharCambiosFormulario();
  }

// LLenar errores
  llenarMensajesErrorCampoContrasenia(controlNameContrasenia: AbstractControl) {
    this.arregloMensajesErrorCampoContrasenia = [];
    if (controlNameContrasenia.errors && (controlNameContrasenia.dirty || controlNameContrasenia.touched)) {
      this.arregloMensajesErrorCampoContrasenia = Object.keys(controlNameContrasenia.errors)
        .map((error) => (this.mensajesErrorCampoContrasenia as any)[error]);
    }
  }

  llenarMensajesErrorCampoNombreUsuario(controlNameNombreUsuario: AbstractControl) {
    this.arregloMensajesErrorCampoNombreUsuario = [];
    if (controlNameNombreUsuario.errors && (controlNameNombreUsuario.dirty || controlNameNombreUsuario.touched)) {
      this.arregloMensajesErrorCampoNombreUsuario = Object.keys(controlNameNombreUsuario.errors)
        .map((error) => {
          return (this.mensajesErrorCampoNombreUsuario as any)[error];
        });
    }
  }

// Escucha cambios de campos
  escucharCambiosFormulario() {
    this.formularioLogin.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valoresFormulario => {
        const esFormularioValido: boolean = this.formularioLogin.valid;
        this.formularioValido = !(!esFormularioValido && (this.formularioLogin.touched || this.formularioLogin.dirty));
      });
  }

  escucharCambiosCampoContrasenia() {
    const campoContrasenia$ = this.formularioLogin.get('contrasenia');
    campoContrasenia$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorContrasena => this.llenarMensajesErrorCampoContrasenia(campoContrasenia$));
  }

  escucharCambiosCampoNombreUsuario() {
    const campoNombreUsuario$ = this.formularioLogin.get('nombreUsuario');
    campoNombreUsuario$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorNombreUsuario => this.llenarMensajesErrorCampoNombreUsuario(campoNombreUsuario$));
  }

// Formulario
  enviarFormularioLogin() {
    if (this.formularioValido) {
      const nombreUsuario = this.formularioLogin.get('nombreUsuario')?.value;
      const contrasena = this.formularioLogin.get('contrasenia')?.value;
      this._authService.login(nombreUsuario, contrasena)
        .pipe(first())
        .subscribe(
          usuarioLogeado => {
            //ver si sesion existe y si no editar
            this._usuarioSesionService.postSesionUsuarios(
              {
                usuario: usuarioLogeado.id,
                fechaInicioSesionActual: moment().format().toString()
              }
            ).subscribe(value => {
                this._route.navigate(['inicio']);
              }
            );

          },
          error => {
            console.log(error)
            this.errorIniciarSesion = true;
          });
    }
  }
}
