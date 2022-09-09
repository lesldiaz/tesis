import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import {TipoProyectoInterface} from 'src/app/constantes/interfaces/tipo-proyecto.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importar-proyecto',
  templateUrl: './importar-proyecto.component.html',
  styleUrls: ['./importar-proyecto.component.css']
})
export class ImportarProyectoComponent implements OnInit {
  formularioProyecto: FormGroup;
  nombreArchivo = 'No file selected';
  tiposProyecto: TipoProyectoInterface[] = [];
  tipoProyectoSeleccionado: TipoProyectoInterface | undefined;
  @Output() proyectoACrearOEditar: EventEmitter<object> = new EventEmitter<object>();
  @Output() habilitarBotonSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  arregloMensajesErrorCampoNombre: string [] = [];
  arregloMensajesErrorCampoDescripcion: string [] = [];
  arregloMensajesErrorCampoTipoProyecto: string [] = [];
  mensajesErrorCampoNombre = {
    required: 'Name field is required',
    maxlength: 'Project name field must contain a maximum of 100 characters',
  };
  mensajesErrorCampoDescripcion = {
    maxlength: 'Project description field must contain a maximum of 255 characters',
  };
  mensajesErrorCampoTipoProyecto = {
    required: 'Project type field is required'
  };


  formularioValido: any;
  nroReqCargados = 0;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _route: Router) {
    this.tiposProyecto = [
      {nombre: 'Generic requirements (PG)', codigo: 'C'},
      {nombre: 'iPlus requirements (PiP)', codigo: 'J'},
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
      this.habilitarBotonSubmit.emit(true);
    } else {
      console.log('No esta controlado submit desde los inputs');
    }

  }

  async onFileChange(event: any) {
    this.nombreArchivo = event.target.files[0].name;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});

      const wsProyectoName: string = wb.SheetNames[0];
      const wsRequerimientoName: string = wb.SheetNames[1];
      const wsRequerimiento: XLSX.WorkSheet = wb.Sheets[wsProyectoName];
      const wsProyecto: XLSX.WorkSheet = wb.Sheets[wsRequerimientoName];

      const dataRequerimiento = XLSX.utils.sheet_to_json(wsRequerimiento); // to get 2d array pass 2nd parameter as object {header: 1}
      const dataProyecto = XLSX.utils.sheet_to_json(wsProyecto); // to get 2d array pass 2nd parameter as object {header: 1}
      this.nroReqCargados = dataRequerimiento.length;
      const proyectoCargado = FUNCIONES_GENERALES.tratamientoDatosExcelProyecto(dataProyecto as any);
      const requerimientosCargados = FUNCIONES_GENERALES.tratamientoDatosExcelRequerimiento(dataRequerimiento as any);
      this.formularioProyecto.patchValue(proyectoCargado);
      proyectoCargado.requerimientos = requerimientosCargados;
      this.tipoProyectoSeleccionado = this.tiposProyecto.find(proyecto => proyecto.codigo === proyectoCargado.tipoProyecto);
      this.proyectoACrearOEditar.emit(proyectoCargado);
    }
  }
}
