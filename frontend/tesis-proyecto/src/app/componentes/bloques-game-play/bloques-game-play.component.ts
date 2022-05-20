import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloques-game-play',
  templateUrl: './bloques-game-play.component.html',
  styleUrls: ['./bloques-game-play.component.css']
})
export class BloquesGamePlayComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Uno', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Dos', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Tres', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Cuatro', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Cinco', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Seis', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Siete', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Ocho', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Nueve', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Diez', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Once', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Doce', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Trece', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Catorce', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Quince', cols: 1, rows: 1, color: 'lightpink'},
  ];
  test:any;
  constructor() { }

  ngOnInit(): void {
  }
  seleccionar(text:string){
    console.log(text);
   this.test = document.getElementById(text);
   this.test.style.display = 'none';
    console.log('se oculto');
  }

}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
