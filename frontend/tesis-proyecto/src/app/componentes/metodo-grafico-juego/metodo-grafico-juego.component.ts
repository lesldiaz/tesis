import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-metodo-grafico-juego',
  templateUrl: './metodo-grafico-juego.component.html',
  styleUrls: ['./metodo-grafico-juego.component.css']
})
export class MetodoGraficoJuegoComponent implements OnInit {

  datos:any[]=[];
  block:any[]=[];
  blockEnvio:any[]=[];
  bandera:boolean=false;
  identificador:any;
  descripcion:any;
  event:any;
  eliminarImg:any;
  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() label: string='';
  constructor() { }



  ngOnInit(): void {

  }
  mostrarPostIt(event:any){
    this.event=event;
    //console.log(event);
    this.bandera=false;
  }
  guardar(){
    this.eliminarImg=document.getElementById('eliminar');
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    this.block.push(this.event);
    console.log(this.block);
    if(this.identificador.value == ""){
      const id =Math.floor(Math.random()*100000);
      this.datos.push({"id":id,
        "descripcion":this.descripcion.value,
        "bloque":this.block
      });
    }else {
      this.actualizar();
    }

    this.limpiar();
  }
  limpiar(){
    this.identificador.value = "";
    this.descripcion.value='';
    this.block=[];
    this.bandera=true;
    this.blockEnvio=[];
    this.eliminarImg.style.display='none';
    this.addNewItem(this.datos);
  }

  select(event:any){
    console.log('seleccionar')
    this.identificador.value = event.id;
    this.descripcion.value= event.descripcion;
    for(let block of event.bloque){
      for(let bl of block){
        //console.log(bl);
        this.blockEnvio.push(bl);
      }
    }
    this.eliminarImg.style.display='';
    this.bandera=false;

  }
  actualizar(){
    for(let i=0; i<this.datos.length;i++){
      const index = i;
      //console.log(index);
      //console.log(this.datos[i]);
      //console.log(this.datos[i].id);
      if(this.datos[i].id==this.identificador.value){
        this.datos[i]={"id":this.identificador.value,
          "descripcion":this.descripcion.value,
          "bloque":this.block};
      }
    }
    //console.log(this.datos)
    this.limpiar();
  }
  eliminar(){
    for(let i=0; i<this.datos.length;i++){
      const index = i;
      if(this.datos[i].id==this.identificador.value){
        this.datos.splice(i,1);
      }
    }
    this.limpiar();

  }
  cancelar(){
    this.eliminarImg=document.getElementById('eliminar');
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    this.limpiar();
  }
  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }

}
