import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs';
import { TipoProyectoInterface } from 'src/app/constantes/interfaces/tipo-proyecto.interface';


@Component({
  selector: 'app-crear-editar-proyecto',
  templateUrl: './crear-editar-proyecto.component.html',
  styleUrls: ['./crear-editar-proyecto.component.css']
})
export class CrearEditarProyectoComponent implements OnInit {
  formularioProyecto: FormGroup;
  tiposProyecto: TipoProyectoInterface[] = [];
  tipoProyectoSeleccionado: TipoProyectoInterface | undefined;
  @Input() proyectoEditar: any;
  @Output() proyectoACrearOEditar: EventEmitter<object> = new EventEmitter<object>();
  @Output() habilitarBotonSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  arregloMensajesErrorCampoNombre: string [] = [];
  arregloMensajesErrorCampoDescripcion: string [] = [];
  arregloMensajesErrorCampoTipoProyecto: string [] = [];
  mensajesErrorCampoNombre = {
    required: 'El campo nombre es requerido',
    maxlength: 'El campo nombre debe contener máximo 100 caracteres',
    pattern: 'El campo nombre debe contener solo letras y números'
  };
  mensajesErrorCampoDescripcion = {
    required: 'El campo descripción es requerido',
    maxlength: 'El campo descripción debe contener máximo 255 caracteres',
  };
  mensajesErrorCampoTipoProyecto = {
    required: 'El tipo de proyecto es requerido'
  };


  formularioValido: any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _route: Router) {
    this.tiposProyecto = [
      {nombre: 'Requerimientos de Software', codigo: 'C'},
      {nombre: 'Requerimientos de iPlus', codigo: 'J'},
    ];
    this.formularioProyecto = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\\s]+')
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      tipoProyecto: new FormControl('', [
        Validators.required,

      ])
    });
    this.habilitarBotonSubmit.emit(false);
  }

  ngOnInit(): void {
    this.escucharCambiosCampoDescripcion();
    this.escucharCambiosCampoTipoProyecto();
    this.escucharCambiosCampoNombre();
    this.escucharCambiosFormulario();
    if (this.proyectoEditar) {
      this.formularioProyecto.patchValue(this.proyectoEditar);
    }
  }

  // LLenar errores
  llenarMensajesErrorCampoNombre(controlNameNombre: AbstractControl) {
    this.arregloMensajesErrorCampoNombre = [];
    if (controlNameNombre.errors && (controlNameNombre.dirty || controlNameNombre.touched)) {
      this.arregloMensajesErrorCampoNombre = Object.keys(controlNameNombre.errors)
        .map((error) => (this.mensajesErrorCampoNombre as any)[error]);
    }
  }

  llenarMensajesErrorCampoDescripcion(controlNameDescripcion: AbstractControl) {
    this.arregloMensajesErrorCampoDescripcion = [];
    if (controlNameDescripcion.errors && (controlNameDescripcion.dirty || controlNameDescripcion.touched)) {
      this.arregloMensajesErrorCampoDescripcion = Object.keys(controlNameDescripcion.errors)
        .map((error) => (this.mensajesErrorCampoDescripcion as any)[error]);
    }
  }

  llenarMensajesErrorCampoTipoProyecto(controlNameTipoProyecto: AbstractControl) {
    this.arregloMensajesErrorCampoTipoProyecto = [];
    if (controlNameTipoProyecto.errors && (controlNameTipoProyecto.dirty || controlNameTipoProyecto.touched)) {
      this.arregloMensajesErrorCampoTipoProyecto = Object.keys(controlNameTipoProyecto.errors)
        .map((error: string) => (this.mensajesErrorCampoTipoProyecto as any)[error]);
    }
  }

  // Escucha cambios de campos
  escucharCambiosFormulario() {
    this.formularioProyecto.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valoresFormulario: any) => {
        const esFormularioValido: boolean = this.formularioProyecto.valid;
        if (!esFormularioValido && (this.formularioProyecto.touched || this.formularioProyecto.dirty)) {
          this.formularioValido = false;
        } else {
          this.formularioValido = true;
          this.enviarFormularioProyecto();
        }
      });
  }

  escucharCambiosCampoNombre() {
    const campoNombre$ = this.formularioProyecto.get('nombre');
    campoNombre$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorNombre: string) => this.llenarMensajesErrorCampoNombre(campoNombre$));
  }

  escucharCambiosCampoDescripcion() {
    const campoDescripcion$ = this.formularioProyecto.get('descripcion');
    campoDescripcion$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorDescripcion: string) => this.llenarMensajesErrorCampoDescripcion(campoDescripcion$));
  }

  escucharCambiosCampoTipoProyecto() {
    const campoTipoProyecto$ = this.formularioProyecto.get('tipoProyecto');
    campoTipoProyecto$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorTipoProyecto: string) => this.llenarMensajesErrorCampoTipoProyecto(campoTipoProyecto$));
  }

  // Formulario
  enviarFormularioProyecto() {
    if (this.formularioValido) {
      this.proyectoACrearOEditar.emit(this.formularioProyecto.value);
      this.habilitarBotonSubmit.emit(true);
    } else {
      console.log('No esta controlado submit desde los inputs');
    }

  }
}
