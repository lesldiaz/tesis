import {Component, OnChanges, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ProyectoService} from 'src/app/servicios/proyecto.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-graficos-chart',
  templateUrl: './graficos-chart.component.html',
  styleUrls: ['./graficos-chart.component.css']
})
export class GraficosChartComponent implements OnInit {
  datos: any;
  ctx: any;
  ct2: any;
  ct3: any;

  constructor(
    private readonly _proyectoService: ProyectoService
  ) {
    const criterioBusqueda = {
      idProyecto: 1
    };
    let getProyectos$ = this._proyectoService.getDatosInforme(criterioBusqueda);
    getProyectos$
      .subscribe(
        (informe: any) => {
          this.datos = informe;
          this.mostrarGraficas(this.datos)
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  async ngOnInit() {
  }

  mostrarGraficas(datos:any){
    this.ctx = document.getElementById('myChart');
    const myChart = new Chart(this.ctx, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: ['Complete', 'Appropriate', 'Feasible', 'Verifiable', 'Correct'],
        datasets: [{
          label: 'Requirements',
          data: [
            //this.datos.minimos.completo,
            //this.datos.minimos.apropiado,
            //this.datos.minimos.factible,
            //this.datos.minimos.verificable,
            //this.datos.minimos.correcto
            20,15,20,5,10
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },plugins: {
        datalabels: {
          /* anchor puede ser "start", "center" o "end" */
          anchor: "end",
          /* Podemos modificar el texto a mostrar */
          formatter: (dato) => dato ,
          /* Color del texto */
          color: "black",


          /* Formato de la fuente,*/
          font: {
            family: '"Arvo", serif',
            size: 12,
            weight: "bold",
          }

        }
      },
      }
    });

    this.ct2 = document.getElementById('myChart2');
    const myChart2 = new Chart(this.ct2, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: ['Unambiguous', 'Singular', 'Traceable', 'Modifiable', 'Consistent','Conforming'],
        datasets: [{
          label: 'Requirements',
          data: [
            //this.datos.deseables.sinAmbiguedad,
            //this.datos.deseables.singular,
            //this.datos.deseables.trazable,
            //this.datos.deseables.modificable,
            //this.datos.deseables.consistente,
            //this.datos.deseables.conforme,
            10,20,30,5,5,10
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },plugins: {
          datalabels: {
            /* anchor puede ser "start", "center" o "end" */
            anchor: "end",
            /* Podemos modificar el texto a mostrar */
            formatter: (dato) => dato ,
            /* Color del texto */
            color: "black",


            /* Formato de la fuente,*/
            font: {
              family: '"Arvo", serif',
              size: 12,
              weight: "bold",
            }

          }
        },
      }
    });

    this.ct3 = document.getElementById('myPie');

    const myChart3 = new Chart(this.ct3, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: [
          'Well-formed requirements',
          'Requirements not well formed'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [
            //this.datos.bienFormados,
            //this.datos.noBienFormados
            10,70
            ],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
          ],
          hoverOffset: 4
        }]
      },
      options:{
        plugins: {
          datalabels: {
            /* anchor puede ser "start", "center" o "end" */
            anchor: "center",
            /* Podemos modificar el texto a mostrar */
            formatter: (dato) => dato ,
            /* Color del texto */
            color: "black",


            /* Formato de la fuente,*/
            font: {
              family: '"Arvo", serif',
              size: 28,
              weight: "bold",
            }

          }
        },
      }
    });
  }

}
