import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
@Component({
  selector: 'app-flujo-trabajo',
  templateUrl: './flujo-trabajo.component.html',
  styleUrls: ['./flujo-trabajo.component.css']
})
export class FlujoTrabajoComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  isEditable = false;
  radiobuttons: string ='';
  divrbttn:any;
  metodoGraf:any;
  button:any;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
  control(event:any){
    if(event.length!=0){
      this.button=document.getElementById('btn');
      this.button.style.display='';
    }
  }
}
