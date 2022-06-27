import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pestana',
  templateUrl: './pestana.component.html',
  styleUrls: ['./pestana.component.css']
})
export class PestanaComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  constructor() { }

  ngOnInit(): void {

  }
}
