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
        label: 'Aplicación',
        routerLink: '/aplicacion'
      },
      {
        label: 'Refinamiento'
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
          this._toasterService.error('Ocurrió un error al guardar los requerimientos ingresados', 'Error')
        });
    this.mover(true);
  }

  refinar() {
    this._requerimientoService.putRefinamiento({idProyecto: this.idProyecto as number})
      .subscribe(value => {
        (this.myStepper as MatStepper).next();
      }, (error) => {
        this._toasterService.error('Ocurrió un error al refinar', 'Error')
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
        this._toasterService.error('Ocurrió un error al editar proyecto', 'Error')
      });
    this.mover(true);
  }

  mover(bnd:boolean){
    this.posicion= document.getElementById("mensaje");
    this.elemento= document.querySelector('.bubble')
    this.flecha=window.getComputedStyle(this.elemento, ':after');
    //console.log("flecha"+this.flecha.left);
    if(bnd==false){
      this.etapa=this.etapa-1;
      this.constX=this.constX-400;
      this.posicion.style.left= this.constX +'px';

    }else{
      this.etapa=this.etapa+1;
      this.constX=this.constX+400;
      this.posicion.style.left= this.constX +'px';
    }
    /*if(this.etapa > 2){
      this.flecha.setAttribute('left','100px');
      console.log("flecha"+this.flecha.left);
    }else{
      this.flecha.setProperty('left','20px');
      console.log("flecha"+this.flecha.left);
    }*/


  }
}
