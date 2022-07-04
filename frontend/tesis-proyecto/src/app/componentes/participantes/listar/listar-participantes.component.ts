import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs';
import {FUNCIONES_GENERALES} from 'src/app/constantes/funciones-generales';
import {
  ModalCrearEditarParticipanteComponent
} from 'src/app/modales/modal-crear-editar-participante/modal-crear-editar-participante.component';
import {ModalEliminarComponent} from 'src/app/modales/modal-eliminar/modal-eliminar.component';
import {ParticipanteService} from 'src/app/servicios/participante.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-listar-participantes',
  templateUrl: './listar-participantes.component.html',
  styleUrls: ['./listar-participantes.component.css']
})
export class ListarParticipantesComponent implements OnInit {
  participantes: any[] = [];
  cols: any[] = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'},
    {field: 'funcion', header: 'Función'},
    {field: 'id', header: 'Opciones'}
  ];
  total: number = 0;
  formularioBuscarParticipante: FormGroup;

  constructor(private readonly _participanteService: ParticipanteService,
              private readonly _toasterService: ToastrService,
              private readonly _route: Router,
              private readonly _dialog: MatDialog,
              private readonly _activatedRoute: ActivatedRoute) {
    this.formularioBuscarParticipante = new FormGroup({
      terminoBusqueda: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.escucharCambiosCampoTerminoBusqueda();
  }

  escucharCambiosCampoTerminoBusqueda() {
    const campoTerminoBusqueda$ = this.formularioBuscarParticipante.get('terminoBusqueda');
    campoTerminoBusqueda$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorTerminoBusqueda => {
        const campoBusqueda = valorTerminoBusqueda;
        if (campoBusqueda) {
          const queryBusqueda = {
            nombre: campoBusqueda,
            apellido: campoBusqueda,
            funcion: campoBusqueda,
          };
          this._route.navigate(['/participantes'], {queryParams: queryBusqueda});
        } else {
          this._route.navigate(['/participantes']);
        }
      });
  }

  cargarMasDatos($event: any) {
    this._activatedRoute.queryParams.subscribe(
      parametroRuta => {
        let getParticipantes$;
        if (parametroRuta) {
          const criterioBusqueda = {
            criterioBusqueda: {
              ...parametroRuta,
              skip: $event.first,
              take: 5
            }
          };
          getParticipantes$ = this._participanteService.getParticipantes($event.first, 5, criterioBusqueda);
        } else {
          getParticipantes$ = this._participanteService.getParticipantes($event.first, 5);
        }
        getParticipantes$
          .subscribe(
            (participantes: any) => {
              this.participantes = participantes.mensaje.resultado;
              this.total = participantes.mensaje.totalResultados;
            },
            (error: any) => {
              console.error(error);
            }
          );
      }
    );
  }

  abrirModalCrear() {
    const modalCrear = this._dialog.open(ModalCrearEditarParticipanteComponent, {
      width: '600px',
      data: false
    });
    modalCrear.afterClosed()
      .subscribe(
        respuestaModalCrear => {
          if (respuestaModalCrear) {
            this._participanteService.postParticipante(respuestaModalCrear)
              .subscribe(
                value => {
                  if (this.participantes && this.participantes.length){
                    this.participantes.unshift(value);
                    if (this.participantes.length > 5) {
                      this.participantes.pop();
                    }
                  } else {
                    this.participantes.push(value);
                  }
                  this._toasterService.success('Registro creado correctamente','Éxito');
                },
                error => {
                  console.error('Error al crear participante', error);
                }
              );
          }
        },
        error => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }


  abrirModalEditar(filaParticipante: any) {
    const modalEditar = this._dialog.open(ModalCrearEditarParticipanteComponent, {
      width: '600px',
      data: filaParticipante
    });
    modalEditar.afterClosed()
      .subscribe(
        participanteActualizado => {
          if (participanteActualizado) {
            this._participanteService.putParticipante(participanteActualizado, filaParticipante.id)
              .subscribe(
                value => {
                  filaParticipante.nombre = participanteActualizado.nombre;
                  filaParticipante.apellido = participanteActualizado.apellido;
                  filaParticipante.funcion = participanteActualizado.funcion;
                  this._toasterService.success('Registro editado correctamente','Éxito');
                },
                error => {
                  console.error('Error al actualizar participante', error);
                }
              );
          }
        },
        error => {
          console.error('Error al cerrar modal editar', error);
        }
      );
  }

  abrirModalEliminar(filaParticipante: any) {
    const modalEliminar = this._dialog.open(ModalEliminarComponent, {
      width: '600px',
      data: filaParticipante
    });
    modalEliminar.afterClosed()
      .subscribe(
        participanteActualizado => {
          if (participanteActualizado) {
            this._participanteService.deleteParticipante(filaParticipante.id)
              .subscribe(
                value => {
                  //this.participantes = FUNCIONES_GENERALES.eliminarElemento(this.participantes, filaParticipante);
                  this.participantes.indexOf(filaParticipante) < 0
                    ? this.participantes
                    : this.participantes.splice(this.participantes.indexOf(filaParticipante), 1);
                  this.participantes = [...this.participantes];
                  this._toasterService.info('Registro eliminado','Éxito');

                },
                error => {
                  this._toasterService.error('Ocurrió un error al eliminar','Error');
                  console.error('Error al eliminar participante', error);
                }
              );
          }
        },
        error => {
          console.error('Error al cerrar modal eliminar', error);
        }
      );
  }

  /*
      abrirModalAsignarRol(filaParticipante) {
        const modalAsignar = this._dialog.open(ModalAsignarRolParticipanteComponent, {
          width: '800px',
          data: filaParticipante
        });
        modalAsignar.afterClosed()
          .subscribe(
            modalCerrado => {
              this.filaSeleccionada = filaParticipante.id;
            },
            error => {
              console.error('Error al cerrar modal editar', error);
            }
          );

      }
    */
}
