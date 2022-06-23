import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import {ResultadoService} from 'src/app/servicios/resultado.service';

@Component({
  selector: 'app-refinamiento',
  templateUrl: './refinamiento.component.html',
  styleUrls: ['./refinamiento.component.css']
})
export class RefinamientoComponent implements OnInit {
  @Input() requerimientos: RequerimientoInterface[] = [];
  @Input() idProyecto: number | undefined;
  @Input() tipoRequerimientos: 'J' | 'C' = 'C';
  display: boolean = false;
  cols: any[] = [
    {field: 'resultado', header: 'Correcto'},
    {field: 'resultado', header: 'Apropiado'},
    {field: 'resultado', header: 'Completo'},
    {field: 'resultado', header: 'Verificable'},
    {field: 'resultado', header: 'Factible'},
    {field: 'resultado', header: 'Sin Ambigüedad'},
    {field: 'resultado', header: 'Singular'},
    {field: 'resultado', header: 'Trazable'},
    {field: 'resultado', header: 'Modificable'},
    {field: 'resultado', header: 'Consistente'},
    {field: 'resultado', header: 'Conforme'},
    {field: 'resultado', header: 'Necesario'},
  ];

  constructor(
    private readonly _resultadoService: ResultadoService,
    private readonly _requerimientoService: RequerimientoService,
    private readonly _proyectoService: ProyectoService,
    private readonly _toasterService: ToastrService,) {
    this
  }

  ngOnInit(): void {
    const criterioBusqueda = {
      proyecto: {
        id: this.idProyecto
      }
    };
    let getProyectos$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getProyectos$
      .subscribe(
        (proyectos: any) => {
          this.requerimientos = proyectos.mensaje.resultado;
          this.requerimientos.map(requerimiento => {
            requerimiento.resultado = (requerimiento.resultado as ResultadoInterface[])[0];
          });
          //this.total = proyectos.mensaje.totalResultados;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  showDialog() {
    this.display = true;
  }

  cambiarCorrecto(estado: any, requerimiento: RequerimientoInterface) {
    const resCorrecto = {
      correcto: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resCorrecto, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).correcto = resCorrecto.correcto;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarApropiado(estado: any, requerimiento: RequerimientoInterface) {
    const resApropiado = {
      apropiado: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resApropiado, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).apropiado = resApropiado.apropiado;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarCompleto(estado: any, requerimiento: RequerimientoInterface) {
    const resCompleto = {
      completo: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resCompleto, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).completo = resCompleto.completo;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarVerificable(estado: any, requerimiento: RequerimientoInterface) {
    const resVerificable = {
      verificable: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resVerificable, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).verificable = resVerificable.verificable;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarFactible(estado: any, requerimiento: RequerimientoInterface) {
    const resFactible = {
      factible: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resFactible, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).factible = resFactible.factible;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarSinAmbiguedad(estado: any, requerimiento: RequerimientoInterface) {
    const resSinAmbiguedad = {
      sinAmbiguedad: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resSinAmbiguedad, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).sinAmbiguedad = resSinAmbiguedad.sinAmbiguedad;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarSingular(estado: any, requerimiento: RequerimientoInterface) {
    const resSingular = {
      singular: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resSingular, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).singular = resSingular.singular;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarTrazable(estado: any, requerimiento: RequerimientoInterface) {
    const resTrazable = {
      trazable: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resTrazable, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).trazable = resTrazable.trazable;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarModificable(estado: any, requerimiento: RequerimientoInterface) {
    const resModificable = {
      modificable: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resModificable, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).modificable = resModificable.modificable;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarConsistente(estado: any, requerimiento: RequerimientoInterface) {
    const resConsistente = {
      consistente: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resConsistente, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).consistente = resConsistente.consistente;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarConforme(estado: any, requerimiento: RequerimientoInterface) {
    const resConforme = {
      conforme: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resConforme, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).conforme = resConforme.conforme;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  cambiarNecesario(estado: any, requerimiento: RequerimientoInterface) {
    const resNecesario = {
      necesario: estado ? 1 : 0,
    }
    const idRes = (requerimiento.resultado as ResultadoInterface).id;
    this._resultadoService.putResultado(resNecesario, idRes as number)
      .subscribe(
        value => {
          (requerimiento.resultado as ResultadoInterface).necesario = resNecesario.necesario;
        },
        error => {
          this._toasterService.error('Error al actualizar', 'Error');
          console.error('Error al actualizar requerimiento', error);
        }
      );
  }

  refinar() {
    this.requerimientos.forEach((requerimiento: RequerimientoInterface) => {
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
            (requerimiento.resultado as ResultadoInterface).observaciones = observacionesFinales;
          },
          error => {
            this._toasterService.error('Error al actualizar', 'Error');
            console.error('Error al actualizar requerimiento', error);
          }
        );
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

    })
  }

}
