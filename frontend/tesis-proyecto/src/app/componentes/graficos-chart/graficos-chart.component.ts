import { Component, OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-graficos-chart',
  templateUrl: './graficos-chart.component.html',
  styleUrls: ['./graficos-chart.component.css']
})
export class GraficosChartComponent implements OnInit {
 ctx:any;
 ct2:any;
 ct3:any;
  ngOnInit(): void {
    this.ctx = document.getElementById('myChart');
    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [ 'Complete', 'Appropriate', 'Feasible', 'Verifiable', 'Correct'],
        datasets: [{
          label: 'Requirements',
          data: [12, 19, 3, 5, 2, 3],
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
        }
      }
    });

    this.ct2 = document.getElementById('myChart2');
    const myChart2 = new Chart(this.ct2, {
      type: 'bar',
      data: {
        labels: [ 'unambiguous', 'Singular', 'Traceable', 'Appropiate', 'Consistent'],
        datasets: [{
          label: 'Requirements',
          data: [12, 19, 3, 5, 2, 3],
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
        }
      }
    });
    this.ct3 = document.getElementById('myPie');
    const myChart3 = new Chart(this.ct3, {
      type: 'pie',
      data:  {
        labels: [
          'Well-formed requirements',
          'Requirements not well formed'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
          ],
          hoverOffset: 4
        }]
      },
    });


  }



}
