import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pestana-plantilla',
  templateUrl: './pestana-plantilla.component.html',
  styleUrls: ['./pestana-plantilla.component.css']
})
export class PestanaPlantillaComponent implements OnInit {
  @Input() tipoProyecto: 'C' | 'J' | undefined;
  @Output() requerimientosCargadosPC: EventEmitter<object[]> = new EventEmitter<object[]>();
  @Output() requerimientosCargadosPJ: EventEmitter<object[]> = new EventEmitter<object[]>();
  requerimientosCargadosC: object[] = [];
  requerimientosCargadosJ: object[] = [];
  bandera :any;
  constructor() { }

  ngOnInit(): void {
    console.log('pp',this.tipoProyecto);
    this.bandera = document.getElementById("GamePlay");
    if(this.tipoProyecto =='J'){
      this.bandera.style.display="";
    }else{
      this.bandera.style.display="none";
    }
  }

  recibirRequerimientosC($event: object[]) {
    this.requerimientosCargadosC = $event;
    this.requerimientosCargadosPC.emit(this.requerimientosCargadosC);
  }
  recibirRequerimientosJ($event: object[]) {
    this.requerimientosCargadosJ = $event;
    this.requerimientosCargadosPJ.emit(this.requerimientosCargadosJ);
  }

}
