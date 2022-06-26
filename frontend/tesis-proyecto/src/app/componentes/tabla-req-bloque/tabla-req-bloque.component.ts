import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-req-bloque',
  templateUrl: './tabla-req-bloque.component.html',
  styleUrls: ['./tabla-req-bloque.component.css']
})
export class TablaReqBloqueComponent implements OnInit {
  @Input()
  datos:any[]=[];

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  select(id:string,rol:string,padre:string,titulo:string,prioridad:any,descripcion:string,postit:any){
    const datoTab ={
      "id":id,
      "rol":rol,
      "padre":padre,
      "titulo":titulo,
      "prioridad":prioridad,
      "descripcion":descripcion,
      "postit":postit
    }
    this.addNewItem(datoTab);
    console.log(datoTab);
  }
  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }



}
