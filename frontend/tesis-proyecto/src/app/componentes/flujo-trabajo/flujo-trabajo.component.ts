import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ExcelPlantillaHuInterface} from 'src/app/constantes/interfaces/excel-plantilla-hu.interface';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';
import { ResultadoInterface } from 'src/app/constantes/interfaces/resultado.interface';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import { ResultadoService } from 'src/app/servicios/resultado.service';

@Component({
  selector: 'app-flujo-trabajo',
  templateUrl: './flujo-trabajo.component.html',
  styleUrls: ['./flujo-trabajo.component.css']
})
export class FlujoTrabajoComponent implements OnInit {
  idProyecto: number | undefined;
  requerimientosCargados: object[] = [];
  requerimientosRefinados: RequerimientoInterface[] = [];
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
    private readonly _resultadoService: ResultadoService,
    private readonly _proyectoService: ProyectoService,
    private readonly _route: Router,
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
  }

  eleccion() {
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
        (this.myStepper as MatStepper).next();
      },
      error => {
        console.log(error)
        this._toasterService.error('Ocurrió un error al guardar los requerimientos ingresados', 'Error')
      });
  }

  refinar() {
    try {
    const criterioBusqueda = {
      proyecto: {
        id: this.idProyecto
      }
    };
    let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getProyectos$
      .subscribe(
        (proyectos: any) => {
          this.requerimientosRefinados = proyectos.mensaje.resultado;
          this.requerimientosRefinados.map(requerimiento => {
            requerimiento.resultado = (requerimiento.resultado as ResultadoInterface[])[0];
          });
          //this.total = proyectos.mensaje.totalResultados;
        },
        (error: any) => {
          console.error(error);
        }
      );
    console.log(this.requerimientosRefinados);
      this.requerimientosRefinados.forEach((requerimiento: RequerimientoInterface) => {
      let observacionesFinales = '';
      const resultados = (requerimiento.resultado as ResultadoInterface) as ResultadoInterface;
      const validacionMin =
        resultados.correcto
        && resultados.apropiado
        && resultados.completo
        && resultados.verificable
        && resultados.factible;
      if (validacionMin) {
        requerimiento.estado = 1;
        observacionesFinales = observacionesFinales +
          'El requerimiento cumple con las características mínimas para ser considerado bien formado.';
      } else {
        requerimiento.estado = 0;
        observacionesFinales = observacionesFinales +
          'El requerimiento no cumple con las siguientes caracteristicas para ser considerado bien formado: ';
        const reqNoCumplidos: string[] = [];
        if (!resultados.correcto) {
          reqNoCumplidos.push('Correcto');
        }
        if(!resultados.apropiado){
          reqNoCumplidos.push('Apropiado');
        }
        if(!resultados.completo){
          reqNoCumplidos.push('Completo');
        }
        if(!resultados.verificable){
          reqNoCumplidos.push('Verificable');
        }
        if(!resultados.factible){
          reqNoCumplidos.push('Factible');
        }
        observacionesFinales = observacionesFinales + reqNoCumplidos.join(', ');
      }
      (requerimiento.resultado as ResultadoInterface).observaciones = observacionesFinales;
      this._requerimientoService.putRequerimiento({
        estado: requerimiento.estado
      }, requerimiento.id as number)
        .subscribe(
          value => {
          },
          error => {
            this._toasterService.error('Error al actualizar', 'Error');
            console.error('Error al actualizar requerimiento', error);
          }
        );
      this._resultadoService.putResultado({
        observaciones: observacionesFinales
      }, resultados.id as number)
        .subscribe(
          value => {
          },
          error => {
            this._toasterService.error('Error al actualizar', 'Error');
            console.error('Error al actualizar requerimiento', error);
          }
        );
    });
      this._proyectoService.putProyecto({
        estado: 'F'
      }, this.idProyecto as number)
        .subscribe(
          value => {
          },
          error => {
            this._toasterService.error('Error al actualizar', 'Error');
            console.error('Error al actualizar requerimiento', error);
          }
        );

    (this.myStepper as MatStepper).next();

    } catch (e) {
      console.error(e)
      this._toasterService.error('Ocurrió un error al refinar','Error');
    }
  }

  irAProyectos() {
    this._route.navigate(['/proyectos']);
  }
}
