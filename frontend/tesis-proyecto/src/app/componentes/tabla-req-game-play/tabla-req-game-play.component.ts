import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-req-game-play',
  templateUrl: './tabla-req-game-play.component.html',
  styleUrls: ['./tabla-req-game-play.component.css']
})
export class TablaReqGamePlayComponent implements OnInit {
  @Input()
  datos:any[]=[];

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  select(id:string,description:string,bloques:any){
    const datoTab ={
      "id":id,
      "descripcion":description,
      "bloque":bloques
    }
    this.addNewItem(datoTab);
    console.log(datoTab);
  }
  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }
}
