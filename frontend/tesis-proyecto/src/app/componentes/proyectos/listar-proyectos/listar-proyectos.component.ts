import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import * as FileSaver from 'file-saver';
import {ToastrService} from 'ngx-toastr';
import {debounceTime} from 'rxjs';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import {ProyectoInterface} from 'src/app/constantes/interfaces/proyecto.interface';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { ResultadoInterface } from 'src/app/constantes/interfaces/resultado.interface';
import {TipoProyectoInterface} from 'src/app/constantes/interfaces/tipo-proyecto.interface';
import {UsuarioInterface} from 'src/app/constantes/interfaces/usuario.interface';
import {
  ModalCrearEditarProyectoComponent
} from 'src/app/modales/modal-crear-editar-proyecto/modal-crear-editar-proyecto.component';
import {
  ModalDuplicarProyectoComponent
} from 'src/app/modales/modal-duplicar-proyecto/modal-duplicar-proyecto.component';
import {ModalEliminarComponent} from 'src/app/modales/modal-eliminar/modal-eliminar.component';
import { ModalExportarProyectoComponent } from 'src/app/modales/modal-exportar-proyecto/modal-exportar-proyecto.component';
import {AuthService} from 'src/app/servicios/auth.service';
import {ProyectoService} from 'src/app/servicios/proyecto.service';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.css']
})
export class ListarProyectosComponent implements OnInit {
  tiposProyecto: TipoProyectoInterface[] = [];
  proyectos: ProyectoInterface[] = [];
  usuarioActual: UsuarioInterface;
  cols: any[] = [
    {field: 'idProyecto', header: 'Identifier'},
    {field: 'nombre', header: 'Name'},
    {field: 'descripcion', header: 'Description'},
    {field: 'proyecto', header: 'Relevant information'},
    {field: 'id', header: 'Options'}
  ];
  total: number = 0;
  formularioBuscarProyecto: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _proyectoService: ProyectoService,
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService,
    private readonly _route: Router,
    private readonly _dialog: MatDialog,
    private readonly _activatedRoute: ActivatedRoute) {
    this.formularioBuscarProyecto = new FormGroup({
      terminoBusqueda: new FormControl('')
    });
    this.tiposProyecto = [
      {nombre: 'Requerimientos de Software', codigo: 'C'},
      {nombre: 'Requerimientos de iPlus', codigo: 'J'},
    ];

    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
  }

  ngOnInit(): void {
    this.escucharCambiosCampoTerminoBusqueda();
  }

  escucharCambiosCampoTerminoBusqueda() {
    const campoTerminoBusqueda$ = this.formularioBuscarProyecto.get('terminoBusqueda');
    campoTerminoBusqueda$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorTerminoBusqueda => {
        const campoBusqueda = valorTerminoBusqueda;
        if (campoBusqueda) {
          const queryBusqueda = {
            nombre: campoBusqueda,
            descripcion: campoBusqueda,
          };
          this._route.navigate(['/proyectos'], {queryParams: queryBusqueda});
        } else {
          this._route.navigate(['/proyectos']);
        }
      });
  }

  cargarMasDatos($event: any) {
    this._activatedRoute.queryParams.subscribe(
      parametroRuta => {
        let getProyectos$;
        if (parametroRuta) {
          const criterioBusqueda = {
            ...parametroRuta,
            usuario: {
              id: this.usuarioActual.id
            }
          };
          getProyectos$ = this._proyectoService.getProyectosFiltro($event.first, 5, criterioBusqueda);
        } else {
          const criterioBusqueda = {
            usuario: {
              id: this.usuarioActual.id
            }
          };
          getProyectos$ = this._proyectoService.getProyectosFiltro($event.first, 5, criterioBusqueda);
        }
        getProyectos$
          .subscribe(
            (proyectos: any) => {
              this.proyectos = proyectos.mensaje.resultado;
              this.total = proyectos.mensaje.totalResultados;
            },
            (error: any) => {
              console.error(error);
            }
          );
      }
    );

  }

  abrirModalCrear() {
    const modalCrear = this._dialog.open(ModalCrearEditarProyectoComponent, {
      width: '600px',
      data: false
    });
    modalCrear.afterClosed()
      .subscribe(
        respuestaModalCrear => {
          if (respuestaModalCrear) {
            respuestaModalCrear.usuario = this.usuarioActual.id;
            respuestaModalCrear.tipoProyecto = respuestaModalCrear.tipoProyecto.codigo;
            this._proyectoService.postProyecto(respuestaModalCrear)
              .subscribe(
                value => {
                  if (this.proyectos && this.proyectos.length) {
                    this.proyectos.unshift(value);
                    if (this.proyectos.length > 5) {
                      this.proyectos.pop();
                    }
                  } else {
                    this.proyectos.push(value);
                  }
                  this._toasterService.success('Record created successfully', 'Success');
                },
                error => {
                  this._toasterService.error('An error occurred while creating the project', 'Error');
                  console.error('Error al crear proyecto', error);
                }
              );
          }
        },
        error => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }
  abrirModalImportar() {
    const modalCrear = this._dialog.open(ModalExportarProyectoComponent, {
      width: '500px',
      data: false
    });
    modalCrear.afterClosed()
      .subscribe(
        respuestaModalCrear => {
          if (respuestaModalCrear) {
            respuestaModalCrear.usuario = this.usuarioActual.id;
            this._proyectoService.postProyectoImportado(respuestaModalCrear)
              .subscribe(
                value => {
                  if (this.proyectos && this.proyectos.length) {
                    this.proyectos.unshift(value);
                    if (this.proyectos.length > 5) {
                      this.proyectos.pop();
                    }
                  } else {
                    this.proyectos.push(value);
                  }
                  this._toasterService.success('Record imported successfully', 'Success');
                },
                error => {
                  this._toasterService.error('Error importing project', 'Error');
                  console.error('Error importing project', error);
                }
              );
          }
        },
        error => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }

  abrirModalEditar(filaProyecto: any) {
    const proyecto = JSON.parse(JSON.stringify(filaProyecto));
    proyecto.tipoProyecto =
      this.tiposProyecto.find(valor => {
        return valor.codigo === proyecto.tipoProyecto;
      });
    const modalEditar = this._dialog.open(ModalCrearEditarProyectoComponent, {
      width: '600px',
      data: proyecto
    });
    modalEditar.afterClosed()
      .subscribe(
        proyectoActualizado => {
          if (proyectoActualizado) {
            console.log(proyectoActualizado);
            proyectoActualizado.tipoProyecto = proyectoActualizado.tipoProyecto.codigo;
            this._proyectoService.putProyecto(proyectoActualizado, filaProyecto.id)
              .subscribe(
                value => {
                  filaProyecto.nombre = proyectoActualizado.nombre;
                  filaProyecto.descripcion = proyectoActualizado.descripcion;
                  filaProyecto.tipoProyecto = proyectoActualizado.tipoProyecto;
                  this._toasterService.success('Record edited successfully', 'Success');
                },
                error => {
                  this._toasterService.error('Failed to update', 'Error');
                  console.error('Error al actualizar proyecto', error);
                }
              );
          }
        },
        error => {
          console.error('Error al cerrar modal editar', error);
        }
      );
  }

  abrirModalDuplicar(filaProyecto: any) {
    const modalDuplicar = this._dialog.open(ModalDuplicarProyectoComponent, {
      width: '600px',
      data: filaProyecto
    });
    modalDuplicar.afterClosed()
      .subscribe(
        proyectoADuplicar => {
          if (proyectoADuplicar) {
            const proyectoDuplicado = JSON.parse(JSON.stringify(proyectoADuplicar));
            proyectoDuplicado.duplicado = 1;
            proyectoDuplicado.nombre = proyectoDuplicado.nombre + ' - Copy';
            proyectoDuplicado.usuario = proyectoDuplicado.usuario.id;
            proyectoDuplicado.estado = proyectoDuplicado.estado === 'F' ? 'P' : proyectoDuplicado.estado;
            delete proyectoDuplicado.idProyecto
            /*delete proyectoDuplicado.id*/
            this._proyectoService.postDuplicarProyecto(proyectoDuplicado)
              .subscribe(
                value => {
                  console.log(value);
                  this.proyectos.unshift(value);
                  if (this.proyectos.length > 5) {
                    this.proyectos.pop();
                  }
                  this._toasterService.success('Duplicate record successfully', 'Success');
                },
                error => {
                  this._toasterService.error('Failed to duplicate record', 'Error');
                  console.error('Error al duplicar proyecto', error);
                }
              );
          }
        },
        error => {
          console.error('Error al cerrar modal duplicar', error);
        }
      );
  }

  abrirModalEliminar(filaProyecto: any) {
    const modalEliminar = this._dialog.open(ModalEliminarComponent, {
      width: '600px',
      data: filaProyecto
    });
    modalEliminar.afterClosed()
      .subscribe(
        proyectoActualizado => {
          if (proyectoActualizado) {
            this._proyectoService.deleteProyecto(filaProyecto.id)
              .subscribe(
                value => {
                  this.proyectos.indexOf(filaProyecto) < 0
                    ? this.proyectos
                    : this.proyectos.splice(this.proyectos.indexOf(filaProyecto), 1);
                  this.proyectos = [...this.proyectos];
                  this._toasterService.info('Record deleted', 'Success');

                },
                error => {
                  this._toasterService.error('An error occurred while deleting', 'Error');
                  console.error('Error al eliminar proyecto', error);
                }
              );
          }
        },
        error => {
          console.error('Error al cerrar modal eliminar', error);
        }
      );
  }

  descargarExcel(filaProyecto: ProyectoInterface){
    const criterioBusqueda = {
      proyecto: {
        id: filaProyecto.id
      }
    };
    let requerimientos: RequerimientoInterface[] = [];
    let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getProyectos$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            requerimientos = proyectos.mensaje?.resultado;
            requerimientos = FUNCIONES_GENERALES.generarObjetoResExcel(requerimientos);
            const cabecera = [
              ["IDENTIFIER", "DESCRIPTION", "VALID", "FULFILLED PROPERTIES", "OBSERVATIONS"]
            ];
            const nombreArchivo = 'projectResults';
            this.exportExcel(requerimientos, cabecera, nombreArchivo);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  exportExcel(requerimientos: RequerimientoInterface[], cabecera: string[][], nombreArchivo: string) {
    import("xlsx").then(xlsx => {
      let worksheet;
      worksheet = xlsx.utils.json_to_sheet(requerimientos);
      xlsx.utils.sheet_add_aoa(worksheet, cabecera);
      xlsx.utils.sheet_add_json(worksheet, requerimientos, {origin: 'A2', skipHeader: true});

      const workbook = {Sheets: {'Output': worksheet}, SheetNames: ['Output']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, nombreArchivo);
    });
  }

  exportExcelDoble(requerimientos: RequerimientoInterface[], proyecto: any, cabeceraR: string[][],cabeceraP: string[][], nombreArchivo: string) {
    import("xlsx").then(xlsx => {
      let worksheet;
      let worksheet2;
      worksheet = xlsx.utils.json_to_sheet(requerimientos);
      xlsx.utils.sheet_add_aoa(worksheet, cabeceraR);
      xlsx.utils.sheet_add_json(worksheet, requerimientos, {origin: 'A2', skipHeader: true});
      worksheet2 = xlsx.utils.json_to_sheet(proyecto);
      xlsx.utils.sheet_add_aoa(worksheet2, cabeceraP);
      xlsx.utils.sheet_add_json(worksheet2, proyecto, {origin: 'A2', skipHeader: true});

      const workbook = {Sheets: {'Output': worksheet, 'Project': worksheet2}, SheetNames: ['Output', 'Project']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, nombreArchivo);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  irANuevoProyecto(idProyecto: number) {
    this._route.navigate(['/nuevoproyecto', idProyecto]);
  }

  irAReporteGrafico(proyecto: ProyectoInterface) {
    this._route.navigate(['/proyectos/reporte-grafico', proyecto.id]);
    console.log(proyecto.id);
  }

  exportarProyecto(proyectoFila: any) {
    // TRATAMIENTO DATOS
    const criterioBusqueda = {
      proyecto: {
        id: proyectoFila.id
      }
    };
    let requerimientos: RequerimientoInterface[] = [];
    let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getProyectos$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            requerimientos = proyectos.mensaje?.resultado;
            const infoProyecto = requerimientos[0].proyecto as ProyectoInterface;
            requerimientos = FUNCIONES_GENERALES.generarObjetoExport(requerimientos);
            const cabeceraR = [
              [
                "IDENTIFIER",
                "TITLE",
                "DESCRIPTION",
                "PRIORITY",
                "IS IPLUS REQ",
                "ROLE",
                "PARENT",
                "BLOCKS",
                "PURPOSES",
                "CORRECT",
                "APPROPRIATE",
                "COMPLETE",
                "VERIFIABLE",
                "FEASIBLE",
                "UNAMBIGUOUS",
                "SINGULAR",
                "TRACEABLE",
                "MODIFIABLE",
                "CONSISTENT",
                "CONFORMING",
                "NECESSARY",
              ]
            ];
            const cabeceraP = [
              [
                "PROJECT TYPE",
                "IS DUPLICATED",
                "NAME",
                "DESCRIPTION",
              ]
            ];
            delete infoProyecto.idProyecto;
            delete infoProyecto.id;
            delete infoProyecto.estado;
            delete infoProyecto.updatedAt;
            delete infoProyecto.createdAt;
            const nombreArchivo = 'ProjectExport';
            this.exportExcelDoble(requerimientos,[infoProyecto], cabeceraR, cabeceraP, nombreArchivo);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
