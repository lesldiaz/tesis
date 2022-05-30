import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.sass']
})
export class MetodologiaComponent implements OnInit {
  migasPan: MenuItem[]=[];
  constructor() { }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'Metodología'
      }
    ];
  }

}
