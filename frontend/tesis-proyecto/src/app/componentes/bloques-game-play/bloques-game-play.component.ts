import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bloques-game-play',
  templateUrl: './bloques-game-play.component.html',
  styleUrls: ['./bloques-game-play.component.css']
})
export class BloquesGamePlayComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Responder', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Gestionar', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Tener suerte', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Disparar', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Crear', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Bloquear', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Recoger', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Destruir', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Mover', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Evitar', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Mantener', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Posición', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Tiempo', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Puntuación', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Juguete', cols: 1, rows: 1, color: 'lightpink'},
  ];
  test:any;
  block: string[] = [];
  notesContainer: any;
  cont:number=0;


  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  @Input()
  bnd:boolean=false;

  @Input()
  blockRec:any;

  constructor() { }

  ngOnInit(): void {
  }
  seleccionar(text:string) {
    //console.log(text);
    this.test = document.getElementById(text);
    this.test.style.display = 'none';
    //console.log('se oculto');
    this.block.push(text);
    console.log(this.block);
    this.bloques(text);
    this.addNewItem(this.block);
  }
  bloques(text:string){
    this.notesContainer = document.getElementById("bloq");
    const noteElement = this.createElement(text);
    this.notesContainer.appendChild(noteElement)
    //console.log(text);
  }
  createElement( content: string){
    const element = document.createElement("div");
    element.classList.add("pieza");
    element.innerHTML="<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"bi bi-puzzle-fill\" viewBox=\"0 0 16 16\">\n" +
      "      <path d=\"M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 0 0-.115.118.113.113 0 0 0-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.213.213 0 0 0 .036-.054l.003-.01v-.008a.112.112 0 0 0-.012-.025.459.459 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 0 0 .115-.118.113.113 0 0 0 .012-.025L9.5 11.5v-.003l-.003-.01a.214.214 0 0 0-.036-.053.859.859 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.214.214 0 0 0-.036.054l-.003.01v.002l.001.006a.113.113 0 0 0 .012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855z\"/>\n" +
      "   <text x='3.5' y='9'>"+content+"</text></svg>";
    element.addEventListener("dblclick",()=>{
      const doDelete = confirm("Are you sure you wish to delete this sticky note?");
      if(doDelete){
        this.deleteNote(content,element);
      }
    });
    return element;
  }
  deleteNote(text:string , element:object){
    const index = this.block.indexOf(text);
    if(index !== -1){
      this.block.splice(index,1);
    }
    this.notesContainer.removeChild(element);
    this.updatebloq(text);
    console.log(this.block);
    this.addNewItem(this.block);
  }
  updatebloq(text:string){
    this.test = document.getElementById(text);
    this.test.style.display = '';
  }

  ngDoCheck() {
    if(this.bnd == true){
      //this.addNewItem(this.block);
      this.limpiar();
    }

      if(this.blockRec.length!=0){
        console.log(this.cont);
        if(this.cont==0){
          for( let block of this.blockRec){
            console.log("block"+block)
            this.seleccionar(block);
          }
          this.cont++;
        }


    }
  }

  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }
  limpiar(){
    const element = document.getElementsByClassName("pieza");
    while(element[0]){
      this.notesContainer.removeChild(element[0]);
    }
    for(let i=0;i<this.block.length;i++){
      this.updatebloq(this.block[i]);
    }
    this.block=[];
    this.bnd=false;
    this.cont=0;
  }


}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
