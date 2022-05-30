import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { debounceTime } from 'rxjs';
import { ParticipanteService } from 'src/app/servicios/participante.service';

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
  filaSeleccionada: number = -1;
  formularioBuscarParticipante: FormGroup;
  constructor(private readonly _participanteService: ParticipanteService,
              private readonly _toasterService: ToasterService,
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
        const campoFiltro = this.formularioBuscarParticipante.get('filtro')?.value;
        const campoBusqueda = valorTerminoBusqueda;
        if (campoBusqueda) {
          const queryBusqueda = {};
          this._route.navigate(['/participante'], {queryParams: queryBusqueda});
        } else {
          this._route.navigate(['/participante']);
        }
      });
  }
  cargarMasDatos($event: any) {
    this._activatedRoute.queryParams.subscribe(
      parametroRuta =>  {
        let getParticipantes$;
        if (parametroRuta) {
          // getParticipantes$ = this._participanteService.getAllParticipantes($event.first, 5, parametroRuta);
          getParticipantes$ = this._participanteService.getAllParticipantes();
        } else {
          getParticipantes$ = this._participanteService.getAllParticipantes();
          // getParticipantes$ = this._participanteService.getAllParticipantes($event.first, 5);
        }
        getParticipantes$
          .subscribe(
            (participantes: any) => {
              console.log(participantes);
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
  /*
    abrirModalCrear() {
      const modalCrear = this._dialog.open(ModalCrearEditarParticipanteComponent, {
        width: '800px',
        data: false
      });
      modalCrear.afterClosed()
        .subscribe(
          respuestaModalCrear => {
            if (respuestaModalCrear) {
              this._participanteService.postParticipante(respuestaModalCrear)
                .subscribe(
                  value => {
                    this.participantes.unshift(value);
                    if (this.participantes.length > 5) {
                      this.participantes.pop();
                    }
                    this.filaSeleccionada = this.participantes[0].id;
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
  
    abrirModalEditar(filaParticipante) {
      const modalEditar = this._dialog.open(ModalCrearEditarParticipanteComponent, {
        width: '800px',
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
                    filaParticipante.direccion = participanteActualizado.direccion;
                    filaParticipante.telefono = participanteActualizado.telefono;
                    this.filaSeleccionada = filaParticipante.id;
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
  irAGestionAulas(id: any) {
    this._route.navigate(['/participante','participante-proyecto', id])
  }
}
