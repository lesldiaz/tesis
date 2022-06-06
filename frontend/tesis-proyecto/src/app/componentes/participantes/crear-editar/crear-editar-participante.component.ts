import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-crear-editar-participante',
  templateUrl: './crear-editar-participante.component.html',
  styleUrls: ['./crear-editar-participante.component.css']
})
export class CrearEditarParticipanteComponent implements OnInit {
  formularioParticipante: FormGroup;
  @Input() participanteEditar: any;
  @Output() participanteACrearOEditar: EventEmitter<object> = new EventEmitter<object>();
  @Output() habilitarBotonSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  arregloMensajesErrorCampoNombre: string [] = [];
  arregloMensajesErrorCampoApellido: string [] = [];
  arregloMensajesErrorCampoFuncion: string [] = [];
  mensajesErrorCampoNombre = {
    required: 'El campo nombre es requerido',
    maxlength: 'El campo nombre debe contener máximo 200 caracteres',
    pattern: 'El campo nombre debe contener solo letras'
  };
  mensajesErrorCampoApellido = {
    required: 'El campo apellido es requerido',
    maxlength: 'El campo apellido debe contener máximo 200 caracteres',
    pattern: 'El campo apellido debe contener solo letras',
  };
  mensajesErrorCampoFuncion = {
    required: 'El campo función es requerido',
    maxlength: 'El campo función debe contener máximo 200 caracteres',
    pattern: 'El campo función debe contener solo letras',
  };


  formularioValido: any;
  constructor(
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _route: Router) {
    this.formularioParticipante = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')
      ]),
      funcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]+')
      ])
    });
    this.habilitarBotonSubmit.emit(false);
  }

  ngOnInit(): void {
    this.escucharCambiosCampoApellido();
    this.escucharCambiosCampoFuncion();
    this.escucharCambiosCampoNombre();
    this.escucharCambiosFormulario();
    if (this.participanteEditar) {
      this.formularioParticipante.patchValue(this.participanteEditar);
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
  llenarMensajesErrorCampoApellido(controlNameApellido: AbstractControl) {
    this.arregloMensajesErrorCampoApellido = [];
    if (controlNameApellido.errors && (controlNameApellido.dirty || controlNameApellido.touched)) {
      this.arregloMensajesErrorCampoApellido = Object.keys(controlNameApellido.errors)
        .map((error) => (this.mensajesErrorCampoApellido as any)[error]);
    }
  }
  llenarMensajesErrorCampoFuncion(controlNameFuncion: AbstractControl) {
    this.arregloMensajesErrorCampoFuncion = [];
    if (controlNameFuncion.errors && (controlNameFuncion.dirty || controlNameFuncion.touched)) {
      this.arregloMensajesErrorCampoFuncion = Object.keys(controlNameFuncion.errors)
        .map((error: string) => (this.mensajesErrorCampoFuncion as any)[error]);
    }
  }
  // Escucha cambios de campos
  escucharCambiosFormulario() {
    this.formularioParticipante.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valoresFormulario: any) => {
        const esFormularioValido: boolean = this.formularioParticipante.valid;
        if (!esFormularioValido && (this.formularioParticipante.touched  || this.formularioParticipante.dirty)) {
          this.formularioValido = false;
        } else {
          this.formularioValido = true;
          this.enviarFormularioParticipante();
        }
      });
  }
  escucharCambiosCampoNombre() {
    const campoNombre$ = this.formularioParticipante.get('nombre');
    campoNombre$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorNombre: string) => this.llenarMensajesErrorCampoNombre(campoNombre$));
  }
  escucharCambiosCampoApellido() {
    const campoApellido$ = this.formularioParticipante.get('apellido');
    campoApellido$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorApellido: string) => this.llenarMensajesErrorCampoApellido(campoApellido$));
  }
  escucharCambiosCampoFuncion() {
    const campoFuncion$ = this.formularioParticipante.get('funcion');
    campoFuncion$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe((valorFuncion: string) => this.llenarMensajesErrorCampoFuncion(campoFuncion$));
  }
  // Formulario
  enviarFormularioParticipante() {
    if (this.formularioValido) {
      this.participanteACrearOEditar.emit(this.formularioParticipante.value);
      this.habilitarBotonSubmit.emit(true);
    } else {
      console.log('No esta controlado submit desde los inputs');
    }

  }
}
