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
  styleUrls: ['modal.cambiar-contrasena.component.sass']
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
  formularioValido: boolean;

  mensajesErrorCampoContrasena = {
    required: 'El campo es requerido',
    pattern: 'La contraseña debe contener al menos una letra mayuscula y minuscula, un número y entre 8 a 12 caracteres'
  };

  arregloMensajesErrorCampoContrasena: string [] = [];
  ngOnInit(): void {
    this.escucharCambiosCampoContrasena();
    this.escucharCambiosFormulario();
  }
  cancelarModal() {
    this._cookieService.destruirUsuarioCookie();
    this._dialogRef.close();
    this._route.navigate(['login']);
  }
  enviarDatos() {
    const nuevaContrasena = this.cambiarContrasenaFormulario.get('contrasena').value;
    this._usuarioService.putUsuarios({
      contrasena: nuevaContrasena,
    }, this.usuario.id).subscribe(value => {
        this._dialogRef.close(nuevaContrasena);
    }, error => console.error('Error cambiar contrasena', error));
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
          return this.mensajesErrorCampoContrasena[error];
        });
    }
  }
  escucharCambiosCampoContrasena() {
    const campoContrasena$ = this.cambiarContrasenaFormulario.get('contrasena');
    campoContrasena$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorContrasena => this.llenarMensajesErrorCampoContrasena(campoContrasena$));
  }
}
