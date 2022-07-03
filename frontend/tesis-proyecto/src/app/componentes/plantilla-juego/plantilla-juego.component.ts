import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plantilla-juego',
  templateUrl: './plantilla-juego.component.html',
  styleUrls: ['./plantilla-juego.component.css']
})
export class PlantillaJuegoComponent implements OnInit {
  data:any;
  change:any;
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() label: string='';
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
