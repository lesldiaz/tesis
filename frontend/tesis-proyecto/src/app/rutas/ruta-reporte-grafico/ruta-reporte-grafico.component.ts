import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProyectoInterface } from 'src/app/constantes/interfaces/proyecto.interface';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-ruta-reporte-grafico',
  templateUrl: './ruta-reporte-grafico.component.html',
  styleUrls: ['./ruta-reporte-grafico.component.css']
})
export class RutaReporteGraficoComponent implements OnInit {
  migasPan: MenuItem[]= [];
  idProyecto: number | undefined;
  tipoProyecto: 'C' | 'J' | undefined;
  proyecto: ProyectoInterface | undefined;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _proyectoService: ProyectoService,
  ) { }

  ngOnInit(): void {
    this.migasPan = [
      {
        label: 'App',
        routerLink: '/aplicacion'
      },
      {
        label: 'Projects',
        routerLink: '/proyectos'
      },
      {
        label: 'Report'
      }
    ];
    this._activatedRoute.params.subscribe(
      parametroRuta => {
        this.idProyecto = parametroRuta['id'];
      }
    );
    this._proyectoService.getProyecto(this.idProyecto as number)
      .subscribe(
        (proyecto: any) => {
          if ( typeof proyecto.mensaje.resultado !== 'string') {
            this.proyecto = proyecto.mensaje.resultado;
            this.tipoProyecto = proyecto.mensaje.resultado.tipoProyecto;
          }

        }
      );
    console.log("dsfsf aqui", this.idProyecto, this.tipoProyecto)
  }

}
