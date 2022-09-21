import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {debounceTime, first } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  formularioRegistro: FormGroup;
  errorRegistro = false;
  arregloMensajesErrorCampoContrasenia: string [] = [];
  arregloMensajesErrorCampoNombreUsuario: string [] = [];
  arregloMensajesErrorCampoEmail: string [] = [];
  mensajesErrorCampoContrasenia = {
    required: 'Password field is required',
    maxlength: 'Password field must have a maximum of 20 characters',
    minlength: 'Password field must have at least 8 characters',
  };
  mensajesErrorCampoNombreUsuario = {
    required: 'Name field is required',
    maxlength: 'Name field must have a maximum of 18 characters',
    pattern: 'Name field must have only letters and numbers'
  };
  mensajesErrorCampoEmail = {
    required: 'Email field is required',
    maxlength: 'Email field must have a maximum of 200 characters',
    email: 'Email field is not valid'
  };

  formularioValido: boolean = false;

  constructor(
    private readonly _toasterService: ToastrService,
    private readonly _usuarioService: UsuarioService,
    private _authService: AuthService,
    private readonly _route: Router
  ) {
    this.formularioRegistro = new FormGroup({
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\\s]+')
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.email
      ])
    });
  }

  ngOnInit(): void {
    this.escucharCambiosCampoNombreUsuario();
    this.escucharCambiosCampoContrasenia();
    this.escucharCambiosCampoEmail();
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

  llenarMensajesErrorCampoEmail(controlNameEmail: AbstractControl) {
    this.arregloMensajesErrorCampoEmail = [];
    if (controlNameEmail.errors && (controlNameEmail.dirty || controlNameEmail.touched)) {
      this.arregloMensajesErrorCampoEmail = Object.keys(controlNameEmail.errors)
        .map((error) => (this.mensajesErrorCampoEmail as any)[error]);
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
    this.formularioRegistro.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valoresFormulario => {
        const esFormularioValido: boolean = this.formularioRegistro.valid;
        this.formularioValido = !(!esFormularioValido && (this.formularioRegistro.touched || this.formularioRegistro.dirty));
      });
  }

  escucharCambiosCampoContrasenia() {
    const campoContrasenia$ = this.formularioRegistro.get('contrasena');
    campoContrasenia$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorContrasena => this.llenarMensajesErrorCampoContrasenia(campoContrasenia$));
  }

  escucharCambiosCampoNombreUsuario() {
    const campoNombreUsuario$ = this.formularioRegistro.get('nombreUsuario');
    campoNombreUsuario$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorNombreUsuario => this.llenarMensajesErrorCampoNombreUsuario(campoNombreUsuario$));
  }

  escucharCambiosCampoEmail() {
    const campoEmail$ = this.formularioRegistro.get('email');
    campoEmail$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorEmail => this.llenarMensajesErrorCampoEmail(campoEmail$));
  }

// Formulario
  enviarFormularioRegistro() {
    if (this.formularioValido) {
      const nombreUsuarioF = this.formularioRegistro.get('nombreUsuario')?.value;
      const contrasenaF = this.formularioRegistro.get('contrasena')?.value;
      const emailF = this.formularioRegistro.get('email')?.value;
      const nuevoUsuario =  {
        nombreUsuario: nombreUsuarioF,
        email: emailF,
        contrasena:contrasenaF
      }
      this._usuarioService.registro(nuevoUsuario)
        .subscribe(
          usuarioLogeado => {
            this._toasterService.success('Registration completed', 'Success');
            this._route.navigate(['login']);
          },
          error => {
            this._toasterService.error('An error occurred', 'Error');
            this.errorRegistro = true;
          });
    }
  }
  irALogin() {
    const ruta = [ 'login']
    this._route.navigate(ruta);
  }
}
