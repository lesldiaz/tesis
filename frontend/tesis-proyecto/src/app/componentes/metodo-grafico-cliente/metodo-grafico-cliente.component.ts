import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-grafico-cliente',
  templateUrl: './metodo-grafico-cliente.component.html',
  styleUrls: ['./metodo-grafico-cliente.component.css']
})
export class MetodoGraficoClienteComponent implements OnInit {
  roles:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  cambioRol(){
    console.log('cambio')

  }
}
