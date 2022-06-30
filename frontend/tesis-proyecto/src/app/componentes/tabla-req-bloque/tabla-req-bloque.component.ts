import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-tabla-req-bloque',
  templateUrl: './tabla-req-bloque.component.html',
  styleUrls: ['./tabla-req-bloque.component.css']
})
export class TablaReqBloqueComponent implements OnInit {
  @Input()
  datos: RequerimientoInterface[]=[];
  @Input() idProyecto: number | undefined;
  selectedRequerimiento: RequerimientoInterface | undefined;
  requerimientos: RequerimientoInterface[]=[];

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly _requerimientoService: RequerimientoService,
  ) { }

  ngOnInit(): void {
    this.requerimientos = this.datos;
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
            this.datos = proyectos.mensaje.resultado;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  onRowSelect(event: any) {
    this.devuelveDatos.emit(event.data);
  }
}
