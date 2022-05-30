import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-migaspan',
  templateUrl: './migaspan.component.html',
  styleUrls: ['./migaspan.component.css']
})
export class MigasPanComponent implements OnInit {
  @Input() conjuntoMigas: MenuItem[] = [];
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/inicio'};
  constructor() { }

  ngOnInit(): void {
  }

}
