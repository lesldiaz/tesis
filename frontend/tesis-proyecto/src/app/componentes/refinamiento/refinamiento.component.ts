import {Component, Input, OnInit} from '@angular/core';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import { ResultadoService } from 'src/app/servicios/resultado.service';

@Component({
  selector: 'app-refinamiento',
  templateUrl: './refinamiento.component.html',
  styleUrls: ['./refinamiento.component.css']
})
export class RefinamientoComponent implements OnInit {
  @Input() requerimientos: RequerimientoInterface[] = [];
  @Input() tipoRequerimientos: 'J' | 'C' = 'C';
  cols: any[] = [
    {field: 'idRequerimiento', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'prioridad', header: 'Prioridad'},
    {field: 'requerimientoPadre', header: 'Padre'},
    {field: 'resultado', header: 'Correcto'},
    {field: 'resultado', header: 'Apropiado'},
    {field: 'resultado', header: 'Completo'},
    {field: 'resultado', header: 'Verificable'},
    {field: 'resultado', header: 'Factible'},
    {field: 'resultado', header: 'Sin Ambigüedad'},
    {field: 'resultado', header: 'Singular'},
    {field: 'resultado', header: 'Trazable'},
    {field: 'resultado', header: 'Modificable'},
    {field: 'resultado', header: 'Consistente'},
    {field: 'resultado', header: 'Conforme'},
    {field: 'resultado', header: 'Necesario'},
  ];

  constructor(private readonly _proyectoService: ResultadoService) {
  }

  ngOnInit(): void {
  }

  cambiarCorrecto(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;

    console.log(requerimiento)
  }

  cambiarApropiado(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarCompleto(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarVerificable(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarFactible(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarSinAmbiguedad(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarSingular(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarTrazable(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarModificable(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarConsistente(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarConforme(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

  cambiarNecesario(estado: any, idRequerimiento: number) {
    const requerimiento = this.requerimientos.find((value: RequerimientoInterface) => value.id === idRequerimiento);
    ((requerimiento as RequerimientoInterface).resultado as ResultadoInterface).correcto = estado ? 1 : 0;
    console.log(requerimiento)
  }

}
