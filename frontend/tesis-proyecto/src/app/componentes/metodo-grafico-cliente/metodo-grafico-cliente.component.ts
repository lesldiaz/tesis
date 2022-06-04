import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-grafico-cliente',
  templateUrl: './metodo-grafico-cliente.component.html',
  styleUrls: ['./metodo-grafico-cliente.component.css']
})
export class MetodoGraficoClienteComponent implements OnInit {
  roles:string[]=[];
  rolesop:any;
  container:any;
  var = 0;

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

  }

}
