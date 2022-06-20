import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {debounceTime} from 'rxjs';
import {TipoProyectoInterface} from 'src/app/constantes/interfaces/tipo-proyecto.interface';
import {
  ModalCrearEditarProyectoComponent
} from 'src/app/modales/modal-crear-editar-proyecto/modal-crear-editar-proyecto.component';
import {
  ModalDuplicarProyectoComponent
} from 'src/app/modales/modal-duplicar-proyecto/modal-duplicar-proyecto.component';
import {ModalEliminarComponent} from 'src/app/modales/modal-eliminar/modal-eliminar.component';
import {ProyectoService} from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.css']
})
export class ListarProyectosComponent implements OnInit {
  tiposProyecto: TipoProyectoInterface[] = [];
  proyectos: any[] = [];
  usuarioActual: number = -1;
  cols: any[] = [
    {field: 'idProyecto', header: 'Identificador'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'proyecto', header: 'Información Relevante'},
    {field: 'id', header: 'Opciones'}
  ];
  total: number = 0;
  formularioBuscarProyecto: FormGroup;

  constructor(private readonly _proyectoService: ProyectoService,
              private readonly _toasterService: ToastrService,
              private readonly _route: Router,
              private readonly _dialog: MatDialog,
              private readonly _activatedRoute: ActivatedRoute) {
    this.formularioBuscarProyecto = new FormGroup({
      terminoBusqueda: new FormControl('')
    });
    this.tiposProyecto = [
      {nombre: 'Requerimientos de Cliente', codigo: 'C'},
      {nombre: 'Requerimientos de Juego Serio', codigo: 'J'},
    ];
    this.usuarioActual = 3;
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
              id: this.usuarioActual
            }
          };
          getProyectos$ = this._proyectoService.getProyectosFiltro($event.first, 5, criterioBusqueda);
        } else {
          const criterioBusqueda = {
            usuario: {
              id: this.usuarioActual
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
            console.log(respuestaModalCrear);
            respuestaModalCrear.usuario = this.usuarioActual;
            respuestaModalCrear.tipoProyecto = respuestaModalCrear.tipoProyecto.codigo;
            this._proyectoService.postProyecto(respuestaModalCrear)
              .subscribe(
                value => {
                  this.proyectos.unshift(value);
                  if (this.proyectos.length > 5) {
                    this.proyectos.pop();
                  }
                  this._toasterService.success('Registro creado correctamente', 'Éxito');
                },
                error => {
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

  abrirModalEditar(filaProyecto: any) {

    filaProyecto.tipoProyecto =
      this.tiposProyecto.find(valor => {
        return valor.codigo === filaProyecto.tipoProyecto;
      });
    const modalEditar = this._dialog.open(ModalCrearEditarProyectoComponent, {
      width: '600px',
      data: filaProyecto
    });
    modalEditar.afterClosed()
      .subscribe(
        proyectoActualizado => {
          if (proyectoActualizado) {
            proyectoActualizado.tipoProyecto = proyectoActualizado.tipoProyecto.codigo;
            this._proyectoService.putProyecto(proyectoActualizado, filaProyecto.id)
              .subscribe(
                value => {
                  filaProyecto.nombre = proyectoActualizado.nombre;
                  filaProyecto.descripcion = proyectoActualizado.descripcion;
                  filaProyecto.tipoProyecto = proyectoActualizado.tipoProyecto;
                  this._toasterService.success('Registro editado correctamente', 'Éxito');
                },
                error => {
                  this._toasterService.error('Error al actualizar', 'Error');
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

            const proyectoDuplicado = Object.assign({}, proyectoADuplicar);
            proyectoDuplicado.duplicado = 1;
            proyectoDuplicado.nombre = proyectoDuplicado.nombre + ' - Copia';
            proyectoDuplicado.usuario = proyectoDuplicado.usuario.id;
            delete proyectoDuplicado.idProyecto
            delete proyectoDuplicado.id
            this._proyectoService.postProyecto(proyectoDuplicado)
              .subscribe(
                value => {
                  console.log(value);
                  this.proyectos.unshift(value);
                  if (this.proyectos.length > 5) {
                    this.proyectos.pop();
                  }
                  this._toasterService.success('Registro duplicado correctamente', 'Éxito');
                },
                error => {
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
                  //this.proyectos = FUNCIONES_GENERALES.eliminarElemento(this.proyectos, filaProyecto);
                  this.proyectos.indexOf(filaProyecto) < 0
                    ? this.proyectos
                    : this.proyectos.splice(this.proyectos.indexOf(filaProyecto), 1);
                  this.proyectos = [...this.proyectos];
                  this._toasterService.info('Registro eliminado', 'Éxito');

                },
                error => {
                  this._toasterService.error('Ocurrió un error al eliminar', 'Error');
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
}
