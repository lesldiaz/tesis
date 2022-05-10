import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {UsuarioService} from '../../../servicios/usuario.service';

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: 'crear.editar.component.html',
  styleUrls: ['crear.editar.component.sass']
})
export class CrearEditarUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup;
  usuarios: any [];
  @Input() usuarioEditar: any;
  @Output() usuarioACrearOEditar: EventEmitter<object> = new EventEmitter<object>();
  @Output() habilitarBotonSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  arregloMensajesErrorCampoNombre: string [] = [];
  arregloMensajesErrorCampoApellido: string [] = [];
  arregloMensajesErrorCampoCedula: string [] = [];
  arregloMensajesErrorCampoCelular: string [] = [];
  arregloMensajesErrorCampoDireccion: string [] = [];
  mensajesErrorCampoNombre = {
    required: 'El campo nombre es requerido',
    maxlength: 'El campo nombre debe tener maximo 30 caracteres',
    pattern: 'El campo nombre debe tener solo letras'
  };
  mensajesErrorCampoApellido = {
    required: 'El campo apellido es requerido',
    maxlength: 'El campo apellido debe tener maximo 30 caracteres',
    pattern: 'El campo apellido debe tener solo letras',
  };
  mensajesErrorCampoCedula = {
    required: 'El campo cedula es requerido',
    maxlength: 'El campo cedula debe tener maximo 10 caracteres',
    minlength: 'La cedula debe tener 10 digitos',
    pattern: 'El campo cedula debe tener solo numeros',
    validacionCedula: 'La cedula es incorrecta',
    validacionCedulaYaExiste: 'La cedula ya existe en el sistema'
  };
  mensajesErrorCampoDireccion = {
    required: 'El campo dirección domiciliaria es requerido',
    maxlength: 'El campo dirección debe tener maximo 60 caracteres',
  };
  mensajesErrorCampoCelular = {
    required: 'El campo teléfono celular es requerido',
    maxlength: 'El campo teléfono debe tener maximo 10 caracteres',
    minlength: 'El teléfono debe tener 10 digitos',
    pattern: 'El campo teléfono debe tener solo numeros',
  };

  formularioValido: any;
  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _route: Router) {
    this.formularioUsuario = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\d+$'),
        this.validacionCedula(),
        this.validacionExisteCedula()
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
        // Validators.pattern('^\\d+$')
      ])
    });
    this.habilitarBotonSubmit.emit(false);
    this._usuarioService.getAllUsuarios()
      .subscribe((respuestaGet: any) => {
        this.usuarios = respuestaGet.mensaje.resultado;
      }, error => console.error('Error consultar usuarios validar cedula', error));
  }

  ngOnInit(): void {
    this.escucharCambiosCampoApellido();
    this.escucharCambiosCampoCedula();
    this.escucharCambiosCampoDireccion();
    this.escucharCambiosCampoCelular();
    this.escucharCambiosCampoNombre();
    this.escucharCambiosFormulario();
    if (this.usuarioEditar) {
      this.formularioUsuario.patchValue(this.usuarioEditar);
      this.formularioUsuario.get('cedula').disable();
    }
  }
  // LLenar errores
  llenarMensajesErrorCampoNombre(controlNameNombre: AbstractControl) {
    this.arregloMensajesErrorCampoNombre = [];
    if (controlNameNombre.errors && (controlNameNombre.dirty || controlNameNombre.touched)) {
      this.arregloMensajesErrorCampoNombre = Object.keys(controlNameNombre.errors)
        .map((error) => this.mensajesErrorCampoNombre[error]);
    }
  }
  llenarMensajesErrorCampoApellido(controlNameApellido: AbstractControl) {
    this.arregloMensajesErrorCampoApellido = [];
    if (controlNameApellido.errors && (controlNameApellido.dirty || controlNameApellido.touched)) {
      this.arregloMensajesErrorCampoApellido = Object.keys(controlNameApellido.errors)
        .map((error) => this.mensajesErrorCampoApellido[error]);
    }
  }
  llenarMensajesErrorCampoCedula(controlNameCedula: AbstractControl) {
    this.arregloMensajesErrorCampoCedula = [];
    if (controlNameCedula.errors && (controlNameCedula.dirty || controlNameCedula.touched)) {
      this.arregloMensajesErrorCampoCedula = Object.keys(controlNameCedula.errors)
        .map((error) => {
          return this.mensajesErrorCampoCedula[error];
        });
    }
  }
  llenarMensajesErrorCampoDireccion(controlNameDireccion: AbstractControl) {
    this.arregloMensajesErrorCampoDireccion = [];
    if (controlNameDireccion.errors && (controlNameDireccion.dirty || controlNameDireccion.touched)) {
      this.arregloMensajesErrorCampoDireccion = Object.keys(controlNameDireccion.errors)
        .map((error) => this.mensajesErrorCampoDireccion[error]);
    }
  }
  llenarMensajesErrorCampoCelular(controlNameCelular: AbstractControl) {
    this.arregloMensajesErrorCampoCelular = [];
    if (controlNameCelular.errors && (controlNameCelular.dirty || controlNameCelular.touched)) {
      this.arregloMensajesErrorCampoCelular = Object.keys(controlNameCelular.errors)
        .map((error) => this.mensajesErrorCampoCelular[error]);
    }
  }
  // Escucha cambios de campos
  escucharCambiosFormulario() {
    this.formularioUsuario.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valoresFormulario => {
        const esFormularioValido: boolean = this.formularioUsuario.valid;
        if (!esFormularioValido && (this.formularioUsuario.touched  || this.formularioUsuario.dirty)) {
          this.formularioValido = false;
        } else {
          this.formularioValido = true;
          this.enviarFormularioUsuario();
        }
      });
  }
  escucharCambiosCampoNombre() {
    const campoNombre$ = this.formularioUsuario.get('nombre');
    campoNombre$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorNombre => this.llenarMensajesErrorCampoNombre(campoNombre$));
  }
  escucharCambiosCampoDireccion() {
    const campoDireccion$ = this.formularioUsuario.get('direccion');
    campoDireccion$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorDireccion => this.llenarMensajesErrorCampoDireccion(campoDireccion$));
  }
  escucharCambiosCampoCedula() {
    const campoCedula$ = this.formularioUsuario.get('cedula');
    campoCedula$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorCedula => this.llenarMensajesErrorCampoCedula(campoCedula$));
  }
  escucharCambiosCampoApellido() {
    const campoApellido$ = this.formularioUsuario.get('apellido');
    campoApellido$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorApellido => this.llenarMensajesErrorCampoApellido(campoApellido$));
  }
  escucharCambiosCampoCelular() {
    const campoCelular$ = this.formularioUsuario.get('telefono');
    campoCelular$.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorCelular => this.llenarMensajesErrorCampoCelular(campoCelular$));
  }
  // Formulario
  enviarFormularioUsuario() {
    if (this.formularioValido) {
      this.usuarioACrearOEditar.emit(this.formularioUsuario.value);
      this.habilitarBotonSubmit.emit(true);
    } else {
      console.log('No esta controlado submit desde los inputs');
    }

  }
  // Validaciones Customizadas
  validacionCedula() {
    return (controlNameCedula: AbstractControl): { [atributo: string]: boolean } | null => {
      const tieneErrores: boolean = this.validarCedula(controlNameCedula.value);
      if (!tieneErrores) {
        return null;
      } else {
        return {
          validacionCedula: true
        };
      }
    };
  }
  validarCedula(cedula): boolean {
    if (cedula.length === 10) {
      const digitoRegion = cedula.substring(0, 2);
      if ( digitoRegion >= 1 && digitoRegion <= 24 ) {
        const ultimoDigito   = cedula.substring(9, 10);
        const pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) +
          parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
        let numero1 = cedula.substring(0, 1);
        numero1 = (numero1 * 2);
        if ( numero1 > 9 ) {
          numero1 = (numero1 - 9);
        }

        let numero3 = cedula.substring(2, 3);
        numero3 = (numero3 * 2);
        if ( numero3 > 9 ) {
          numero3 = (numero3 - 9);
        }

        let numero5 = cedula.substring(4, 5);
        numero5 = (numero5 * 2);
        if ( numero5 > 9 ) {
          numero5 = (numero5 - 9);
        }

        let numero7 = cedula.substring(6, 7);
        numero7 = (numero7 * 2);
        if ( numero7 > 9 ) {
          numero7 = (numero7 - 9);
        }

        let numero9 = cedula.substring(8, 9);
        numero9 = (numero9 * 2);
        if ( numero9 > 9 ) {
          numero9 = (numero9 - 9);
        }

        const impares = numero1 + numero3 + numero5 + numero7 + numero9;
        const suma_total = (pares + impares);
        const primer_digito_suma = suma_total.toString().substring(0, 1);

        const decena = (parseInt(primer_digito_suma) + 1)  * 10;
        let digito_validador = decena - suma_total;
        if (digito_validador === 10) {
          digito_validador = 0;
        }

        return digito_validador !== ultimoDigito;

      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  comprobarCedulaYaExiste(cedulaUsuarioNuevo) {
    if (this.usuarios) {
      const cedulaEncontrado = this.usuarios.find((usuario) => {
        return usuario.cedula === cedulaUsuarioNuevo;
      });
      return !!cedulaEncontrado;
    } else {
      return false;
    }
  }

  validacionExisteCedula() {
    return (controlNameCedula: AbstractControl): { [atributo: string]: boolean } | null => {
      const tieneErrores: boolean = this.comprobarCedulaYaExiste(controlNameCedula.value);
      if (!tieneErrores) {
        return null;
      } else {
        return {
          validacionCedulaYaExiste: true
        };
      }
    };
  }
}
