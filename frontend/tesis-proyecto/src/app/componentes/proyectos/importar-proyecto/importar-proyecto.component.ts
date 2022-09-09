import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs';
import { TipoProyectoInterface } from 'src/app/constantes/interfaces/tipo-proyecto.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importar-proyecto',
  templateUrl: './importar-proyecto.component.html',
  styleUrls: ['./importar-proyecto.component.css']
})
export class ImportarProyectoComponent implements OnInit {
  formularioProyecto: FormGroup;
  tiposProyecto: TipoProyectoInterface[] = [];
  tipoProyectoSeleccionado: TipoProyectoInterface | undefined;
  @Output() proyectoACrearOEditar: EventEmitter<object> = new EventEmitter<object>();
  @Output() habilitarBotonSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  arregloMensajesErrorCampoNombre: string [] = [];
  arregloMensajesErrorCampoDescripcion: string [] = [];
  arregloMensajesErrorCampoTipoProyecto: string [] = [];
  mensajesErrorCampoNombre = {
    required: 'El campo nombre es requerido',
    maxlength: 'El campo nombre debe contener máximo 100 caracteres',
  };
  mensajesErrorCampoDescripcion = {
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
      {nombre: 'Requerimientos Genericos (PG)', codigo: 'C'},
      {nombre: 'Requerimientos de iPlus (PiP)', codigo: 'J'},
    ];
    this.formularioProyecto = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      descripcion: new FormControl('', [
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

  async onFileChange(event: any) {
    const nombreArchivo = event.target.files[0].name;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {range: 5}); // to get 2d array pass 2nd parameter as object {header: 1}
      /*this.resultado = FUNCIONES_GENERALES.tratamientoDatosExcel(data as any);
      this.nroReqCargados = this.resultado.length;
      this.requerimientosCargadosC.emit(this.resultado);*/
    }
  }
}
