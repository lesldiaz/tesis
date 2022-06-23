import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pestana-plantilla',
  templateUrl: './pestana-plantilla.component.html',
  styleUrls: ['./pestana-plantilla.component.css']
})
export class PestanaPlantillaComponent implements OnInit {
  @Output() requerimientosCargadosPPC: EventEmitter<object[]> = new EventEmitter<object[]>();
  requerimientosCargados: object[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  recibirRequerimientos($event: object[]) {
    this.requerimientosCargados = $event;
    this.requerimientosCargadosPPC.emit(this.requerimientosCargados);
  }

}
