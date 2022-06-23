import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-req-game-play',
  templateUrl: './tabla-req-game-play.component.html',
  styleUrls: ['./tabla-req-game-play.component.css']
})
export class TablaReqGamePlayComponent implements OnInit {
  @Input()
  datos:any[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
