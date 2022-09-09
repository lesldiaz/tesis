import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ListarUsuarioComponent} from '../../componentes/usuario/listar/listar.usuario.component';
import {CookieUsuarioService} from '../../servicios/cookie.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {UsuarioService} from '../../servicios/usuario.service';

@Component({
  selector: 'app-modal-cambiar-contrasena',
  templateUrl: 'modal.cambiar-contrasena.component.html',
  styleUrls: ['modal.cambiar-contrasena.component.css']
})
export class ModalCambiarContrasenaComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private readonly _data: any,
              private readonly _cookieService: CookieUsuarioService,
              private readonly _usuarioService: UsuarioService,
              private readonly _route: Router,
              private readonly _dialogRef: MatDialogRef<ListarUsuarioComponent>) {
    this.cambiarContrasenaFormulario = new FormGroup({
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}')
      ])
    });
    this.usuario = this._data;
  }
  usuario: any;
  cambiarContrasenaFormulario: FormGroup;
  formularioValido: boolean = false;

  mensajesErrorCampoContrasena = {
    required: 'Password field is required',
    pattern: 'The password must contain at least one uppercase and lowercase letter, one number and between 8 to 12 characters'
  };

  arregloMensajesErrorCampoContrasena: string [] = [];
  ngOnInit(): void {
    this.escucharCambiosCampoContrasena();
    this.escucharCambiosFormulario();
  }
  cancelarModal() {
    this._dialogRef.close();
  }
  enviarDatos() {
    const nuevaContrasena = this.cambiarContrasenaFormulario.get('contrasena')?.value;
    this._dialogRef.close(nuevaContrasena);
  }

  escucharCambiosFormulario() {
    this.cambiarContrasenaFormulario.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valoresFormulario => {
        const esFormularioValido: boolean = this.cambiarContrasenaFormulario.valid;
        this.formularioValido = !(!esFormularioValido && (this.cambiarContrasenaFormulario.touched || this.cambiarContrasenaFormulario.dirty));
      });
  }

  llenarMensajesErrorCampoContrasena(controlNameContrasena: AbstractControl) {
    this.arregloMensajesErrorCampoContrasena = [];
    if (controlNameContrasena.errors && (controlNameContrasena.dirty || controlNameContrasena.touched)) {
      this.arregloMensajesErrorCampoContrasena = Object.keys(controlNameContrasena.errors)
        .map((error) => {
          return (this.mensajesErrorCampoContrasena as any)[error];
        });
    }
  }

  escucharCambiosCampoContrasena() {
    const campoContrasena$ = this.cambiarContrasenaFormulario.get('contrasena');
    campoContrasena$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorContrasena => this.llenarMensajesErrorCampoContrasena(campoContrasena$));
  }
}
