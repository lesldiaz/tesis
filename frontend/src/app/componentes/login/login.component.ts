import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {UsuarioService} from '../../servicios/usuario.service';
import {CookieUsuarioService} from '../../servicios/cookie.service';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  errorIniciarSesion = false;
  usuarios: any [];
  arregloMensajesErrorCampoContrasenia: string [] = [];
  arregloMensajesErrorCampoNombreUsuario: string [] = [];
  mensajesErrorCampoContrasenia = {
    required: 'El campo contraseña es requerido',
    maxlength: 'El campo contraseña debe tener maximo 18 caracteres',
    minlength: 'El campo contraseña debe tener minimo 8 caracteres',
    pattern: 'El campo contraseña debe tener solo letras'
  };
  mensajesErrorCampoNombreUsuario = {
    required: 'El campo nombre de usuario es requerido',
    maxlength: 'El campo nombre de usuario debe tener maximo 200 caracteres',
    minlength: 'El nombre de usuario debe tener 5 digitos',
    pattern: 'El campo nombre de usuario debe tener solo numeros',
    // validacionCedulaYaExiste: 'No existe un usuario registrado con esa cedula'
  };

  formularioValido: boolean;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _dialog: MatDialog,
              private readonly _cookieService: CookieUsuarioService,
              private readonly _toasterService: ToasterService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _route: Router) {
    this.formularioLogin = new FormGroup({
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
        Validators.pattern('[A-Za-z0-9]+'),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.maxLength(18),
        Validators.minLength(8)
      ])
    });
    this._usuarioService.getAllUsuarios()
      .subscribe((respuestaGet: any) => {
        this.usuarios = respuestaGet.mensaje.resultado;
      }, error => console.error('Error consultar usuarios', error));
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
        .map((error) => this.mensajesErrorCampoContrasenia[error]);
    }
  }

  llenarMensajesErrorCampoNombreUsuario(controlNameNombreUsuario: AbstractControl) {
    this.arregloMensajesErrorCampoNombreUsuario = [];
    if (controlNameNombreUsuario.errors && (controlNameNombreUsuario.dirty || controlNameNombreUsuario.touched)) {
      this.arregloMensajesErrorCampoNombreUsuario = Object.keys(controlNameNombreUsuario.errors)
        .map((error) => {
          return this.mensajesErrorCampoNombreUsuario[error];
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
    campoContrasenia$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorContrasena => this.llenarMensajesErrorCampoContrasenia(campoContrasenia$));
  }

  escucharCambiosCampoNombreUsuario() {
    const campoNombreUsuario$ = this.formularioLogin.get('nombreUsuario');
    campoNombreUsuario$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorNombreUsuario => this.llenarMensajesErrorCampoNombreUsuario(campoNombreUsuario$));
  }

  // Formulario
  enviarFormularioLogin() {
    if (this.formularioValido) {
      const nombreUsuarioLogin = this.formularioLogin.get('nombreUsuario').value;
      const contraseniaLogin = this.formularioLogin.get('contrasenia').value;
      const usuarioLogeado = this.usuarios.find((usuario: any) => {
        return nombreUsuarioLogin === usuario.nombreUsuario && contraseniaLogin === usuario.contrasenia;
      });
      if (usuarioLogeado) {
        if (usuarioLogeado.contrasena !== 'A12345678b') {
          delete usuarioLogeado.contrasena;
        }
        usuarioLogeado['estaLogeado'] = true;
        this._cookieService.guardarUsuarioCookie(usuarioLogeado, 'usuario');
        this._route.navigate(['inicio']);
      } else {
        this.errorIniciarSesion = true;
      }
    } else {
      console.info('No esta controlado submit desde los inputs');
    }
  }
}
