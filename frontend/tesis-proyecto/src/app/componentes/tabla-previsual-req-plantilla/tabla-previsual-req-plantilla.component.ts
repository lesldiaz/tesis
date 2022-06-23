import {Component, Input, OnInit} from '@angular/core';
import { ResultadoInterface } from 'src/app/constantes/interfaces/resultado.interface';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-tabla-previsual-req-plantilla',
  templateUrl: './tabla-previsual-req-plantilla.component.html',
  styleUrls: ['./tabla-previsual-req-plantilla.component.css']
})
export class TablaPrevisualReqPlantillaComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  requerimientos: any[] = [];
  selectedRequerimientos: any[]=[];
  cols: any[] = [
    {field: 'identificador', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'prioridad', header: 'Prioridad'},
    {field: 'padre', header: 'Padre'},
  ];
  total: number = 0;

  constructor(
    private readonly _requerimientoService: RequerimientoService,
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
          if(typeof proyectos.mensaje !== 'string'){
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

}
