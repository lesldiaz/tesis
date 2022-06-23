import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-grafico-juego',
  templateUrl: './metodo-grafico-juego.component.html',
  styleUrls: ['./metodo-grafico-juego.component.css']
})
export class MetodoGraficoJuegoComponent implements OnInit {
  datos:object[]=[];
  block:any[]=[];
  bandera:boolean=false;
  identificador:any;
  descripcion:any;
  constructor() { }

  ngOnInit(): void {
  }
  mostrarPostIt(event:any){
    console.log(event);
    this.block.push(event);
  }
  guardar(){
    this.bandera=true;
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    if(this.identificador.value == ""){
      const id =Math.floor(Math.random()*100000);
      this.datos.push({"id":id,
        "descripcion":this.descripcion.value,
        "bloque":this.block
      });
    }else{
      this.datos.push({"id":this.identificador.value,
        "descripcion":this.descripcion.value,
        "bloque":this.block
      });
    }
    this.limpiar();
  }
  limpiar(){
    this.identificador.value = "";
    this.descripcion.value='';
  }
}
