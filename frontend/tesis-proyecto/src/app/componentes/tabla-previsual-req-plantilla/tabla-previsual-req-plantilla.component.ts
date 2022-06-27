import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-tabla-previsual-req-plantilla',
  templateUrl: './tabla-previsual-req-plantilla.component.html',
  styleUrls: ['./tabla-previsual-req-plantilla.component.css']
})
export class TablaPrevisualReqPlantillaComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  @Input() buscarRequerimientos: boolean = false;
  requerimientos: RequerimientoInterface[] = [];
  selectedRequerimientos: RequerimientoInterface[] = [];
  cols: any[] = [
    {field: 'identificador', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'prioridad', header: 'Prioridad'},
    {field: 'padre', header: 'Padre'},
  ];
  total: number = 0;

  constructor(
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService,
    private readonly confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
      const criterioBusqueda = {
        proyecto: {
          id: this.idProyecto
        }
      };
      let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 5, criterioBusqueda);
      getProyectos$
        .subscribe(
          (proyectos: any) => {
            if (typeof proyectos.mensaje !== 'string') {
              this.requerimientos = proyectos.mensaje.resultado;
              this.requerimientos.map(requerimiento => {
                requerimiento.resultado = (requerimiento.resultado as ResultadoInterface[])[0];
              });
              this.total = proyectos.mensaje.totalResultados;
            } else {
              this.total = 0;
            }
          },
          (error: any) => {
            console.error(error);
          }
        );
  }

  cargarMasDatos($event: any) {
    this.requerimientos = this.requerimientos.slice($event.first, ($event.first + $event.rows));
    console.log($event.first);
  }

  eliminarMasivo() {
    const idReqEliminar: any[] = [];
    this.selectedRequerimientos.forEach(requerimientoS => {
          idReqEliminar.push(requerimientoS.id)
    });
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar los requerimientos seleccionados?',
      header: 'Eliminar',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._requerimientoService.deleteRequerimientosMasivo(idReqEliminar)
          .subscribe( value => {
            this._toasterService.success('Requerimientos eliminados correctamente', 'Éxito');
          }, (error) => {
            this._toasterService.error('Error al eliminar requerimientos', 'Error');
          });
      }
    });
  }
}
