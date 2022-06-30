import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { RequerimientoService } from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-tabla-req-game-play',
  templateUrl: './tabla-req-game-play.component.html',
  styleUrls: ['./tabla-req-game-play.component.css']
})
export class TablaReqGamePlayComponent implements OnInit {
  @Input()
  datos: RequerimientoInterface[]=[];
  @Input() idProyecto: number | undefined;
  selectedRequerimiento: RequerimientoInterface | undefined;
  requerimientos: RequerimientoInterface[]=[];

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly _requerimientoService: RequerimientoService,
  ) { }

  ngOnInit(): void {
    this.requerimientos = this.datos;
  }
  onRowSelect(event: any) {
    this.devuelveDatos.emit(event.data);
  }

}
