import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.component.html',
  styleUrls: ['inicio.component.sass']
})
export class InicioComponent implements OnInit {
  migasPan: MenuItem[] = [];
  constructor() {
  }

  ngOnInit(): void {}
}
