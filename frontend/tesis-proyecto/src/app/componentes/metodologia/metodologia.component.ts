import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.sass']
})
export class MetodologiaComponent implements OnInit {
  migasPan: MenuItem[]=[];
  requerimientos: RequerimientoInterface[]=[
    {
      id: 1,
      idRequerimiento: 'RC1',
      titulo: 'xyz',
      descripcion: 'FGSFDSFSDDFSSSF',
      prioridad: 2,
      estado: 0,
      rol: { nombre : 'usuario'},
      proyecto: 3,
      resultado: {
        correcto: 0,
        apropiado: 0,
        completo: 0,
        verificable: 0,
        factible: 0,
        sinAmbiguedad: 0,
        singular: 0,
        trazable: 0,
        modificable: 0,
        consistente: 0,
        conforme: 0,
        necesario: 0,
        observaciones: ''
    }
    },
    {
      id: 2,
      idRequerimiento: 'RC3',
      titulo: 'xyz',
      descripcion: 'FGSFDSFSDDFSSSF',
      prioridad: 2,
      estado: 0,
      rol: { nombre : 'usuario'},
      proyecto: 3,
      resultado: {
        correcto: 0,
        apropiado: 0,
        completo: 0,
        verificable: 0,
        factible: 0,
        sinAmbiguedad: 0,
        singular: 0,
        trazable: 0,
        modificable: 0,
        consistente: 0,
        conforme: 0,
        necesario: 0,
        observaciones: ''
      }
    },
    {
      id: 3,
      idRequerimiento: 'RC2',
      titulo: 'xyz',
      descripcion: 'FGSFDSFSDDFSSSF',
      prioridad: 2,
      estado: 0,
      rol: { nombre : 'usuario'},
      proyecto: 3,
      resultado: {
        correcto: 0,
        apropiado: 0,
        completo: 0,
        verificable: 0,
        factible: 0,
        sinAmbiguedad: 0,
        singular: 0,
        trazable: 0,
        modificable: 0,
        consistente: 0,
        conforme: 0,
        necesario: 0,
        observaciones: ''
      }
    }
  ]
  constructor() { }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'Metodología'
      }
    ];
  }

}
