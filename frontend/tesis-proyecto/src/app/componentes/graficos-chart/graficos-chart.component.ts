import {Component, OnChanges, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Chart} from 'chart.js';
import {ProyectoService} from 'src/app/servicios/proyecto.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { ResultadoInterface } from 'src/app/constantes/interfaces/resultado.interface';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//const htmlToPdfmake = require("html-to-pdfmake");
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;



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

  @Input() tipoProyecto: 'C' | 'J' | undefined;
  @Input() idProyecto: number | undefined;
  requerimientos: RequerimientoInterface[] = [];
  requerimientosCliente: RequerimientoInterface[] = [];
  requerimientosGamePlay: RequerimientoInterface[] = [];
  cols: any[] = [
    {field: 'idRequerimiento', header: 'Identifier'},
    {field: 'descripcion', header: 'Description'},
    {field: 'esValido', header: 'Is Valid'},
    {field: 'caracteristicasCumplidas', header: 'Fulfilled properties'},
    {field: 'observaciones', header: 'Observations'},
  ];
  divGameplay:any;
  bandera = true;
  tablas:any;
  ancho:any;

  constructor(
    private readonly _proyectoService: ProyectoService,
    private readonly _requerimientoService: RequerimientoService,
  ) {

  }

  ngOnInit() {
    this.bandera = this.tipoProyecto === 'C' ? true : false;
    console.log(this.bandera);
    console.log(this.tipoProyecto);
    this.divGameplay= document.getElementById("GamePlay");
    this.divGameplay.style.display="none";
    if(this.bandera===false){
      console.log(this.bandera);
      this.divGameplay.style.display="";
    }

    const criterioBusqueda = {
      idProyecto: this.idProyecto
    };

    let getProyectos$ = this._proyectoService.getDatosInforme(criterioBusqueda);
    getProyectos$
      .subscribe(
        (informe: any) => {
          this.datos = informe;
          this.mostrarGraficas(this.datos);
        },
        (error: any) => {
          console.error(error);
        }
      );

    const criterioBusquedaTabla = {
      proyecto: {
        id: this.idProyecto
      }
    };
    let getTable$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusquedaTabla);
    getTable$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            this.requerimientos = proyectos.mensaje.resultado;
            this.requerimientos.forEach(requerimiento => {
              //console.log(requerimiento);
              const resultados = (requerimiento.resultado as ResultadoInterface[])[0];
              const validacionImplementacion = resultados?.necesario;
              const reqIndispensablesCumplidos: string[] = [];
              const reqIndispensablesNoCumplidos: string[] = [];
              if (resultados?.correcto) {
                reqIndispensablesCumplidos.push('Correct');
              } else {
                reqIndispensablesNoCumplidos.push('Correct');
              }
              if (resultados?.apropiado) {
                reqIndispensablesCumplidos.push('Appropiate');
              } else {
                reqIndispensablesNoCumplidos.push('Appropiate');
              }
              if (resultados?.completo) {
                reqIndispensablesCumplidos.push('Complete');
              } else {
                reqIndispensablesNoCumplidos.push('Complete');
              }
              if (resultados?.verificable) {
                reqIndispensablesCumplidos.push('Verifiable');
              } else {
                reqIndispensablesNoCumplidos.push('Verifiable');
              }
              if (resultados?.factible) {
                reqIndispensablesCumplidos.push('Feasible');
              } else {
                reqIndispensablesNoCumplidos.push('Feasible');
              }
              const reqDeseablesCumplidos: string[] = [];
              const reqDeseablesNoCumplidos: string[] = [];
              if (resultados?.sinAmbiguedad) {
                reqDeseablesCumplidos.push('Unambiguous');
              } else {
                reqDeseablesNoCumplidos.push('Unambiguous');
              }
              if (resultados?.singular) {
                reqDeseablesCumplidos.push('Singular');
              } else {
                reqDeseablesNoCumplidos.push('Singular');
              }
              if (resultados?.trazable) {
                reqDeseablesCumplidos.push('Traceable');
              } else {
                reqDeseablesNoCumplidos.push('Traceable');
              }
              if (resultados?.modificable) {
                reqDeseablesCumplidos.push('Modifiable');
              } else {
                reqDeseablesNoCumplidos.push('Modifiable');
              }
              if (resultados?.consistente) {
                reqDeseablesCumplidos.push('Consistent');
              } else {
                reqDeseablesNoCumplidos.push('Consistent');
              }
              if (resultados?.conforme) {
                reqDeseablesCumplidos.push('Conforming');
              } else {
                reqDeseablesNoCumplidos.push('Conforming');
              }

              requerimiento.necesarios = reqIndispensablesCumplidos.join(', ');
              requerimiento.noNecesarios = reqIndispensablesNoCumplidos.join(', ');
              requerimiento.deseables = reqDeseablesCumplidos.join(', ');
              requerimiento.noDeseables = reqDeseablesNoCumplidos.join(', ');
              //console.log(requerimiento);
              if (requerimiento.esReqBloque) {
                this.requerimientosGamePlay.push(requerimiento);
              } else {
                this.requerimientosCliente.push(requerimiento);
              }
            });
            this.requerimientos = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientos);
            this.requerimientosCliente = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientosCliente);
            this.requerimientosGamePlay = FUNCIONES_GENERALES.generarObjetoResExcel(this.requerimientosGamePlay);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );


  }

  mostrarGraficas(datos:any){
    const bgColor={
      id:'bgColor',
      beforeDraw:(chart: { width?: any; height?: any; ctx?: any; })=>{
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle='white';
        ctx.fillRect(0,0,chart.width, chart.height);
        ctx.restore();
      }
    }

    this.ctx = document.getElementById('myChart');
    const myChart = new Chart(this.ctx, {
      plugins: [ChartDataLabels,bgColor],
      type: 'bar',
      data: {
        labels: ['Complete', 'Appropriate', 'Feasible', 'Verifiable', 'Correct'],
        datasets: [{
          label: 'Essential requirement',
          data: [
            this.datos.minimos.completo,
            this.datos.minimos.apropiado,
            this.datos.minimos.factible,
            this.datos.minimos.verificable,
            this.datos.minimos.correcto
            //20,15,20,5,10
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
      }
      }
    });

    this.ct2 = document.getElementById('myChart2');
    const myChart2 = new Chart(this.ct2, {
      plugins: [ChartDataLabels,bgColor],
      type: 'bar',
      data: {
        labels: ['Unambiguous', 'Singular', 'Traceable', 'Modifiable', 'Consistent','Conforming'],
        datasets: [{
          label: 'Desirable requirements',
          data: [
            this.datos.deseables.sinAmbiguedad,
            this.datos.deseables.singular,
            this.datos.deseables.trazable,
            this.datos.deseables.modificable,
            this.datos.deseables.consistente,
            this.datos.deseables.conforme,
            //10,20,30,5,5,10
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
      plugins: [ChartDataLabels,bgColor],
      type: 'pie',
      data: {
        labels: [
          'Well-formed requirements',
          'Requirements not well formed'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [
            this.datos.bienFormados,
            this.datos.noBienFormados
            //10,70
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

  downloadAsPDF() {
    const newPie=this.ct3.toDataURL("image/jpeg",1.0);
    const newEssential= this.ctx.toDataURL("image/jpeg",1.0);
    const newDesirable=this.ct2.toDataURL("image/jpeg",1.0);
    this.ancho=document.getElementById('GamePlay');
    this.tablas=document.getElementById('Cliente');
    const pdf = new jsPDF('p');
    pdf.setFontSize(11);
    pdf.text("Total requirements", 95,10);
    pdf.addImage(newPie,'JPEG',75,15,75,75);
    pdf.text("Essential requirement ", 40,125);
    pdf.addImage(newEssential,'JPEG',20,130,80,65);
    pdf.text("Desirable requirements", 125,125);
    pdf.addImage(newDesirable,'JPEG',110,130,80,65);

    if(this.tipoProyecto==="C"){
      html2canvas(this.tablas).then((canvas) => {
        let fileWidth = 175;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        pdf.addPage();
        pdf.text("Table result", 95,10);
        pdf.addImage(FILEURI, 'PNG', 20, 15, fileWidth, 250);
        pdf.save('report.pdf');
      });
    }else{
      html2canvas(this.tablas).then((canvas) => {
        let fileWidth = 175;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        pdf.addPage();
        pdf.text("Table result", 95,10);
        pdf.addImage(FILEURI, 'PNG', 20, 15, fileWidth, 250);
      });
      html2canvas(this.ancho).then((game) => {
        let fileWidth = 175;
        let fileHeight = (game.height * fileWidth) / game.width;
        const FILEURI = game.toDataURL('image/png');
        pdf.addPage();
        pdf.addImage(FILEURI, 'PNG', 20, 5, fileWidth, 250);
        pdf.save('final_report.pdf');
      });
    }

  }

}
