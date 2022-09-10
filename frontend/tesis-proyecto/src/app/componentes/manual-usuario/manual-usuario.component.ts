import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-manual-usuario',
  templateUrl: './manual-usuario.component.html',
  styleUrls: ['./manual-usuario.component.css']
})
export class ManualUsuarioComponent implements OnInit {
  migasPan: MenuItem[]= [];
  videoId:any;
  constructor() { }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'User Manual'
      }
    ];
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);;

  }

}

