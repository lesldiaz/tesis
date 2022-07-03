import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() label: string='';
  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  control(event:any){
    this.addNewItem(event);
  }
  addNewItem(obj:object) {
    this.devuelveDatos.emit(obj);
  }
}
