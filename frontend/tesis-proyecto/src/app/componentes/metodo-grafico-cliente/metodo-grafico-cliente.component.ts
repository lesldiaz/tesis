import { Component, OnInit, Input } from '@angular/core';

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

  @Input()
  posit: object[]=[];

  constructor() { }

  ngOnInit(): void {
  }
  cambioRol(){
    console.log('cambio')
    this.container=document.getElementById('rol');
    this.rolesop =document.getElementById('roles');
    const option = document.createElement('option');
    console.log(this.container.value);
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
      console.log(this.var);
        if(this.var == 0){
          this.roles.push(this.container.value);
          option.value=this.container.value;
          this.rolesop.appendChild(option);
        }
    }
    console.log(this.roles);
    this.guardarInput();
  }
  guardarInput(){
    this.identificador = document.getElementById('id');
    this.container = document.getElementById('rol');
    this.padre = this.selected;
    this.titulo = document.getElementById('titulo');
    this.prioridad = document.getElementsByClassName('rating')
    this.description = document.getElementById('textarea1');

    if(this.identificador.value == ""){
      const id =Math.floor(Math.random()*100000);
      this.datos.push({"id":id,
        "rol":this.container.value,
        "padre":this.padre,
        "titulo":this.titulo.value,
        "prioridad":this.prioridad.value,
        "descipcion":this.description.value
      });
    }else{
      this.datos.push({"id":this.identificador.value,
        "rol":this.container.value,
        "padre":this.padre,
        "titulo":this.titulo.value,
        "prioridad":this.prioridad.value,
        "descipcion":this.description.value
      });
    }

    console.log(this.datos);

  }
}
