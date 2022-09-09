import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  @Input() tipoProyecto: 'C' | 'J' = 'C';
  @Output()
  selectedIndexChange: EventEmitter<number> | undefined
  datosBloque: any[] = [];
  datosCliente: any[] = [];
  bandera = true;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  valor = 50;
  bufferValue = 75;
  bnd:any;

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
    this.bnd = document.getElementById("bar");
    if(this.bandera===false){
      this.bnd.style.display="";
    }else{
      this.bnd.style.display="none";
    }
  }
  myTabSelectedIndexChange(index: number) {
    console.log('Selected index: ' + index);
    if(index===1){
      this.valor=100;
      this.color='accent';
    }else{
      this.valor=50;
      this.color='primary';
    }
  }

}
