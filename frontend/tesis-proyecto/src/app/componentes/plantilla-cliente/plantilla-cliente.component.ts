import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-cliente',
  templateUrl: './plantilla-cliente.component.html',
  styleUrls: ['./plantilla-cliente.component.css']
})
export class PlantillaClienteComponent implements OnInit {
  data:any;
  change:any;
  constructor() { }

  ngOnInit(): void {
  }
  funcion(){
    console.log('inicio');
    console.log('null');


  }
}
