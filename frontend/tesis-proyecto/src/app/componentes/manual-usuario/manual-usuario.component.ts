import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-manual-usuario',
  templateUrl: './manual-usuario.component.html',
  styleUrls: ['./manual-usuario.component.sass']
})
export class ManualUsuarioComponent implements OnInit {
  migasPan: MenuItem[]= [];
  constructor() { }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'User Manual'
      }
    ];
  }

}
