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
    this.change=document.getElementById('file-upload');
    this.data=document.getElementById('upload');
    console.log('inicio');
    const value = this.change.value;
    const value2= value.split('\\');
    console.log(value);
    this.data.value=value2.pop();

  }
}
