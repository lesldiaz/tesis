import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-cliente',
  templateUrl: './plantilla-cliente.component.html',
  styleUrls: ['./plantilla-cliente.component.css']
})
export class PlantillaClienteComponent implements OnInit {
  data:any;
  constructor() { }

  ngOnInit(): void {
  }
  subirArchivo(){
    this.data= document.createElement('input')
    this.data.setAttribute('type','file');

  }
}
