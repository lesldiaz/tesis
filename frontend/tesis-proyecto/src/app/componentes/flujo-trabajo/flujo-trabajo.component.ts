import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import {ExcelPlantillaHuInterface} from 'src/app/constantes/interfaces/excel-plantilla-hu.interface';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import {ProyectoService} from 'src/app/servicios/proyecto.service';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import {ResultadoService} from 'src/app/servicios/resultado.service';

@Component({
  selector: 'app-flujo-trabajo',
  templateUrl: './flujo-trabajo.component.html',
  styleUrls: ['./flujo-trabajo.component.css']
})
export class FlujoTrabajoComponent implements OnInit {
  migasPan: MenuItem[]= [];
  idProyecto: number | undefined;
  tipoProyecto: 'C' | 'J' = 'C';
  pasoActual = 1;
  requerimientosCargados: object[] = [];
  requerimientosCargadosC: object[] = [];
  requerimientosCargadosJ: object[] = [];
  requerimientosRefinados: RequerimientoInterface[] = [];
  firstFormGroup: FormGroup = new FormGroup({});
  isEditable = false;
  banderaPlantillas = false;
  radiobuttons: string | undefined;
  divrbttn: any;
  metodoGraf: any;
  @ViewChild('stepper') private myStepper: MatStepper | undefined;
  paso2 = false;
  paso4 = false;

  etapa=1;
  posicion:any;
  elemento:any;
  flecha:any;
  constX=10;
  stepPos:any;
  stepPos3:any;
  stepPos4:any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toasterService: ToastrService,
    private readonly _requerimientoService: RequerimientoService,
    private readonly _resultadoService: ResultadoService,
    private readonly _proyectoService: ProyectoService,
    private readonly _route: Router,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.migasPan = [
      {
        label: 'App',
        routerLink: '/aplicacion'
      },
      {
        label: 'Refinement'
      }
    ];
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this._activatedRoute.params.subscribe(
      parametroRuta => {
        this.idProyecto = parametroRuta['id'];
      }
    );
    this._proyectoService.getProyecto(this.idProyecto as number)
      .subscribe(
        (proyecto: any) => {
          if ( typeof proyecto.mensaje.resultado !== 'string') {
            this.tipoProyecto = proyecto.mensaje.resultado.tipoProyecto;
          }

        }
      );
  }

  recibirRequerimientosC($event: object[]) {
    this.requerimientosCargadosC = $event;
    this.requerimientosCargadosC.map((req: any) => {
      req['banderaCJ'] = 0;
    });
  }

  recibirRequerimientosJ($event: object[]) {
    this.requerimientosCargadosJ = $event;
    this.requerimientosCargadosJ.map((req: any) => {
      req['banderaCJ'] = 1;
    });
  }

  eleccion() {
    if (this.radiobuttons == "plantilla") {
      this.banderaPlantillas = true;
      this.divrbttn = document.getElementById("radio-bttn");
      this.divrbttn.style.display = 'none';
    }
    if (this.radiobuttons == "grafico") {
      (this.myStepper as MatStepper).next();
      this.mover(true);
    }
  }

  guardarRequerimientosIngresados() {
    this.requerimientosCargados = [
      ...this.requerimientosCargadosC,
      ...this.requerimientosCargadosJ
    ];
    this.requerimientosCargados.forEach((requerimiento: ExcelPlantillaHuInterface) => {
      requerimiento['proyecto'] = +(this.idProyecto as number);
    });
    this._requerimientoService.postRequerimientosExcel(this.requerimientosCargados)
      .subscribe(
        valor => {
          (this.myStepper as MatStepper).next();
        },
        error => {
          console.log(error)
          this._toasterService.error('An error occurred while saving the entered requirements', 'Error')
        });
    this.mover(true);
  }

  refinar() {
    this._requerimientoService.putRefinamiento({idProyecto: this.idProyecto as number})
      .subscribe(value => {
        (this.myStepper as MatStepper).next();
      }, (error) => {
        this._toasterService.error('An error occurred while refining', 'Error')
      });
    this.mover(true);
  }

  irAProyectos() {
    this._route.navigate(['/proyectos']);
  }

  actualizaEstadoProyecto() {
    this._proyectoService.putProyecto({
      estado: 'P'
    }, this.idProyecto as number)
      .subscribe(value => {
        (this.myStepper as MatStepper).next();
      }, (error) => {
        this._toasterService.error('An error occurred while editing project', 'Error')
      });
    this.mover(true);
  }

  mover(bnd:boolean){

    this.posicion= document.getElementById("mensaje");
    if(bnd==false){
      this.etapa=this.etapa-1;
      if(this.etapa ==3){
        this.posicion.style.left= this.stepPos3 +'px';
        this.constX=this.constX-500;
      }else if(this.etapa==2){
        this.posicion.style.left= 410 +'px';
        this.constX=this.constX-400;
      }else if(this.etapa==4){
        this.posicion.style.left= this.stepPos4 +'px';
        this.constX=this.constX-400;
      }

    }else{
      this.etapa=this.etapa+1;
      if(this.etapa ==3){
        this.constX=this.constX+500;
        this.posicion.style.left= this.constX +'px';
        this.stepPos3=this.constX;
      }
      else{
        this.constX=this.constX+400;
        this.posicion.style.left= this.constX +'px';
        this.stepPos4=this.constX;
      }
    }
  }
  obtenerPos(){
    this.stepPos=document.getElementById('segundo');
    this.stepPos3=document.getElementById('tercero');
    this.stepPos4=document.getElementById('cuarto');
    console.log(this.stepPos.style.left);
    console.log(this.stepPos3.style.left);
    console.log(this.stepPos4.style.left);
  }
}
