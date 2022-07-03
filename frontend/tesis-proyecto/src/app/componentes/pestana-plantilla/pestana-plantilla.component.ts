import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pestana-plantilla',
  templateUrl: './pestana-plantilla.component.html',
  styleUrls: ['./pestana-plantilla.component.css']
})
export class PestanaPlantillaComponent implements OnInit {
  requerimientosCargados: object[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() label: string='';
  constructor() { }

  ngOnInit(): void {
  }

  recibirRequerimientos($event: object[]) {
    this.requerimientosCargados = $event;
  }

}
