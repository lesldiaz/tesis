import {Component, Input, OnInit} from '@angular/core';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  @Input() tipoProyecto: 'C' | 'J' = 'C';
  datosBloque: any[] = [];
  datosCliente: any[] = [];
  bandera = true;

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
    let getReq$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getReq$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            const requerimientosProyecto = proyectos.mensaje.resultado;
            requerimientosProyecto.forEach(
              (requerimiento: any) => {
                if (requerimiento.esReqBloque === 0) {
                  this.datosCliente.push(requerimiento);
                }
                if (requerimiento.esReqBloque === 1) {
                  this.datosBloque.push(requerimiento);
                }
              }
            );
          }
        }
      );
    this.bandera = this.tipoProyecto === 'C' ? true : false;
  }
}
