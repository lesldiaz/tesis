import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-metodo-grafico-cliente',
  templateUrl: './metodo-grafico-cliente.component.html',
  styleUrls: ['./metodo-grafico-cliente.component.css']
})
export class MetodoGraficoClienteComponent implements OnInit {
  roles:string[]=[];
  rolesop:any;
  container:any;
  identificador:any;
  padre:any;
  titulo:any;
  prioridad:any;
  description:any;
  var = 0;
  selected = 'option2';
  datos:object[]=[];
  posit:any[]=[];
  bandera:boolean=false;
  event:any;


  constructor() { }

  ngOnInit(): void {
  }
  cambioRol(){
    console.log('cambio')
    this.container=document.getElementById('rol');
    this.rolesop =document.getElementById('roles');
    const option = document.createElement('option');
    //console.log(this.container.value);
    this.var=0;
    if(this.roles.length==0){
      this.roles.push(this.container.value);
      option.value=this.container.value;
      this.rolesop.appendChild(option);
    }else{
      for (const role of this.roles) {
        if(role == this.container.value){
          this.var = this.var + 1;
        }
      }
      //console.log(this.var);
        if(this.var == 0){
          this.roles.push(this.container.value);
          option.value=this.container.value;
          this.rolesop.appendChild(option);
        }
    }
    //console.log(this.roles);
    this.bandera=true;
    this.guardarInput();
  }

  mostrarPostIt(event:any){
    this.event=event;
    //console.log(event);
    this.bandera=false;

  }
  guardarInput(){
    this.identificador = document.getElementById('id');
    this.container = document.getElementById('rol');
    this.padre = this.selected;
    this.titulo = document.getElementById('titulo');
    this.prioridad = document.getElementsByName("estrellas");
    let radio;
    for(var i = 0; i < this.prioridad.length; i++){
      if(this.prioridad[i].checked){
        radio=this.prioridad[i].value;
      }
    }
    this.description = document.getElementById('textarea1');
    this.posit.push(this.event);

    if(this.identificador.value == ""){
      const id =Math.floor(Math.random()*100000);
      this.datos.push({"id":id,
        "rol":this.container.value,
        "padre":this.padre,
        "titulo":this.titulo.value,
        "prioridad":radio,
        "descripcion":this.description.value,
        "postit":this.posit
      });
    }else{
      this.datos.push({"id":this.identificador.value,
        "rol":this.container.value,
        "padre":this.padre,
        "titulo":this.titulo.value,
        "prioridad":radio,
        "descripcion":this.description.value,
        "postit":this.posit
      });
    }
    //console.log(this.datos);

    this.limpiar();

  }

  limpiar(){

    this.prioridad = document.getElementsByName('estrellas');
    for(var i =0;i< 3; i++){
      this.prioridad[i].checked="false";
    }
    this.identificador.value = "";
    this.container.value='';
    this.selected='option2';
    this.titulo.value='';
    this.description.value='';
    this.bandera=true;
    this.posit=[];

  }

}
