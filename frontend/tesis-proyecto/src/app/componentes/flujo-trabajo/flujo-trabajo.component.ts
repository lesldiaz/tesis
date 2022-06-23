import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExcelPlantillaHuInterface} from 'src/app/constantes/interfaces/excel-plantilla-hu.interface';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';

@Component({
  selector: 'app-flujo-trabajo',
  templateUrl: './flujo-trabajo.component.html',
  styleUrls: ['./flujo-trabajo.component.css']
})
export class FlujoTrabajoComponent implements OnInit {
  idProyecto: number | undefined;
  requerimientosCargados: object[] = [];
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  thirdFormGroup: FormGroup = new FormGroup({});
  isEditable = false;
  radiobuttons: string | undefined;
  divrbttn: any;
  metodoGraf: any;
  @ViewChild('stepper') private myStepper: MatStepper | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toasterService: ToastrService,
    private readonly _requerimientoService: RequerimientoService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this._activatedRoute.params.subscribe(
      parametroRuta => {
        this.idProyecto = parametroRuta['id'];
      }
    );

  }

  recibirRequerimientos($event: object[]) {
    this.requerimientosCargados = $event;
    console.log(this.requerimientosCargados);
  }

  eleccion() {
    console.log(this.radiobuttons);

    if (this.radiobuttons == "plantilla") {
      console.log("escogio plantilla");
      this.divrbttn = document.getElementById("radio-bttn");
      this.divrbttn.style.display = 'none';
      this.metodoGraf = document.getElementById("metodo-plantilla");
      this.metodoGraf.style.display = '';
    }
    if (this.radiobuttons == "grafico") {
      this.divrbttn = document.getElementById("radio-bttn");
      this.divrbttn.style.display = 'none';
      this.metodoGraf = document.getElementById("metodo-grafico");
      this.metodoGraf.style.display = '';
    }
  }

  guardarRequerimientosIngresados() {
    this.requerimientosCargados.forEach((requerimiento: ExcelPlantillaHuInterface) => {
      requerimiento['proyecto'] = +(this.idProyecto as number);
    });
    this._requerimientoService.postRequerimientosExcel(this.requerimientosCargados)
      .subscribe(
      valor => {
        console.log('gjhghgj');
        (this.myStepper as MatStepper).next();
      },
      error => {
        console.log(error)
        this._toasterService.error('Ocurrió un error al guardar los requerimientos ingresados', 'Error')
      });
  }
}
