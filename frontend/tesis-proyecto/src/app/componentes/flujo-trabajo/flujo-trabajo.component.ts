import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-flujo-trabajo',
  templateUrl: './flujo-trabajo.component.html',
  styleUrls: ['./flujo-trabajo.component.css']
})
export class FlujoTrabajoComponent implements OnInit {
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isEditable = false;
  radiobuttons: string | undefined;
  divrbttn:any;
  metodoGraf:any;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }
  eleccion(){
    console.log(this.radiobuttons);

    if(this.radiobuttons =="plantilla"){
      console.log("escogio plantilla");
      this.divrbttn = document.getElementById("radio-bttn");
      this.divrbttn.style.display='none';
      this.metodoGraf = document.getElementById("metodo-plantilla");
      this.metodoGraf.style.display='';
    }
    if(this.radiobuttons == "grafico") {
      this.divrbttn = document.getElementById("radio-bttn");
      this.divrbttn.style.display='none';
      this.metodoGraf = document.getElementById("metodo-grafico");
      this.metodoGraf.style.display='';
    }
  }
}
