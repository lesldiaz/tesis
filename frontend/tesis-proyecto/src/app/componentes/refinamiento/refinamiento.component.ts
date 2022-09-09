import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';
import {ProyectoService} from 'src/app/servicios/proyecto.service';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import {ResultadoService} from 'src/app/servicios/resultado.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-refinamiento',
  templateUrl: './refinamiento.component.html',
  styleUrls: ['./refinamiento.component.css']
})
export class RefinamientoComponent implements OnInit {
  @Input() tipoProyecto: 'C' | 'J' | undefined;
  requerimientos: RequerimientoInterface[] = [];
  requerimientosCliente: RequerimientoInterface[] = [];
  requerimientosGamePlay: RequerimientoInterface[] = [];
  @Input() idProyecto: number | undefined;
  @Output()
  selectedIndexChange: EventEmitter<number> | undefined

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  valor = 50;
  bufferValue = 75;
  bnd:any;

  display: boolean = false;
  dialogHeader: string = '';
  dialogContent: string = '';
  colsCliente: any[] = [
    {field: 'resultado', header: 'Unambiguous'},
    {field: 'resultado', header: 'Feasible'},
    {field: 'resultado', header: 'Correct'},
    {field: 'resultado', header: 'Appropriate'},
    {field: 'resultado', header: 'Verifiable'},
    {field: 'resultado', header: 'Complete'},
    {field: 'resultado', header: 'Necessary'},
    {field: 'resultado', header: 'Singular'},
    {field: 'resultado', header: 'Conforming'},
    {field: 'resultado', header: 'Consistent'},
    {field: 'resultado', header: 'Modifiable'},
    {field: 'resultado', header: 'Traceable'},
  ];
  preguntasCliente: any[] = [
    {
      header: 'Unambiguous',
      pregunta: '¿Los requerimientos están claros, no existe ambiguedad?'
    },
    {
      header: 'Feasible',
      pregunta: '¿El requerimiento es factible, es decir, es realizable a pesar de las limitaciones del sistema (ejemplo por costo, horario, y por parte técnica) con riesgo aceptable?¿El requerimiento tienen alguna estricción técnica?'
    },
    {
      header: 'Correct',
      pregunta: 'El requermiento representa la necesidad real que el cliente necesita?'
    },
    {
      header: 'Appropriate',
      pregunta: '¿El requerimiento está dentro del alcance del proyecto y refleja una necesidad real?'
    },
    {
      header: 'Verifiable',
      pregunta: '¿El requerimiento es verificable mediante un caso de prueba?'
    },
    {
      header: 'Complete',
      pregunta: '¿El requerimiento es necesario, sino se incluye como requisito existirá alguna deficiencia, para otros requerimientos?'
    },
    {
      header: 'Necessary',
      pregunta: '¿El requerimiento es necesario, sino se incluye como requisito existirá alguna deficiencia, para otros requerimientos?'
    },
    {
      header: 'Singular',
      pregunta: '¿El requerimiento establece una sola característica, es singular, o puede descomponerse en varios?'
    },
    {
      header: 'Conforming',
      pregunta: '¿El requerimiento esta conforme al estandar de la organización?'
    },
    {
      header: 'Consistent',
      pregunta: '¿El requerimiento es consistente no contradice a otros requerimientos o no se encuentra repetido?'
    },
    {
      header: 'Modifiable',
      pregunta: '¿El requerimiento puede ser modificable sin alterar a otros requerimientos o alcance del producto?'
    },
    {
      header: 'Traceable',
      pregunta: '¿El requerimiento tiene una trazabilidad original que mantiene la necesidad del cliente?'
    },
  ];
  colsGamePlay: any[] = [
    {field: 'resultado', header: 'Complete'},
    {field: 'resultado', header: 'Appropriate'},
    {field: 'resultado', header: 'Correct'},
    {field: 'resultado', header: 'Necessary'},
    {field: 'resultado', header: 'Verifiable'},
    {field: 'resultado', header: 'Feasible'},
    {field: 'resultado', header: 'Unambiguous'},
    {field: 'resultado', header: 'Modifiable'},
    {field: 'resultado', header: 'Singular'},
    {field: 'resultado', header: 'Traceable'},
    {field: 'resultado', header: 'Consistent'},
    {field: 'resultado', header: 'Conforming'},
  ];
  preguntasGameplay: any[] = [
    {
      header: 'Unambiguous',
      pregunta: '¿La tarjeta GamePlay requiere aclaración para ser implementado, no tiene ambigüedad?'
    },
    {
      header: 'Feasible',
      pregunta: '¿Es factible realizar esta funcionalidad en la plataforma tecnólogica que se va a desarrollar?'
    },
    {
      header: 'Correct',
      pregunta: '¿La tarjeta GamePlay esta relacionado a la funcionalidad que el usuario necesita, de acuerdo a su alcance. Es  correcto?'
    },
    {
      header: 'Appropriate',
      pregunta: '¿Existe sinergia entre la tarjeta GamePlay con la historia/narrativa/género. Existe consistencia, es apropiado?'
    },
    {
      header: 'Verifiable',
      pregunta: '¿El GamePlay es verificable?'
    },
    {
      header: 'Complete',
      pregunta: '¿La tarjeta GamePlay incluye BLOQUES gameplay. Esta completa respetanto el formato?'
    },
    {
      header: 'Necessary',
      pregunta: '¿Es necesario que la tarjeta GamePlay sea implementada?'
    },
    {
      header: 'Singular',
      pregunta: '¿La tarjeta GamePlay no se puede dividir en otras funcionalidades, es singular?'
    },
    {
      header: 'Conforming',
      pregunta: '¿El diseño funcional del juego que contiene la tarjeta GamePlay es conforme con todas las opiniones de los participantes?'
    },
    {
      header: 'Consistent',
      pregunta: '¿La tarjeta GamePlay es consistente, no se contradice con el diseño inicial propuesto del juego?'
    },
    {
      header: 'Modifiable',
      pregunta: '¿La tarjeta GamePlay puede ser mejorada o modificada?'
    },
    {
      header: 'Traceable',
      pregunta: '¿La tarjeta GamePlay mantene su trazabilidad respetando el principio del diseño del juego?'
    },
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
          if (typeof proyectos.mensaje !== 'string') {
            this.requerimientos = proyectos.mensaje?.resultado;
            this.requerimientos.map((requerimiento: RequerimientoInterface) => {
              requerimiento.resultado = (requerimiento.resultado as ResultadoInterface[])[0];
              if (requerimiento.esReqBloque) {
                this.requerimientosGamePlay.push(requerimiento);
              } else {
                this.requerimientosCliente.push(requerimiento);
              }
            });
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    this.bnd = document.getElementById("bar");
    if(this.tipoProyecto==='C'){
      this.bnd.style.display="none";
    }else{
      this.bnd.style.display="";
    }
  }

  showDialog(header: string, tipo: 'C' | 'J' = 'C') {
    let caracteristica;
    if (tipo === 'C') {
      caracteristica = this.preguntasCliente.find(caracteristica => caracteristica.header === header);
    } else {
      caracteristica = this.preguntasGameplay.find(caracteristica => caracteristica.header === header);
    }
    this.dialogHeader = caracteristica.header;
    this.dialogContent = caracteristica.pregunta
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          this._toasterService.error('Failed to update', 'Error');
          console.error('Failed to update requerimiento', error);
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
          'The requirement meets the minimum properties to be considered well formed.';
      } else {
        requerimiento.estado = 0;
        observacionesFinales = observacionesFinales +
          'The requirement doesn\'t meet the following properties to be considered well formed: ';
        const reqNoCumplidos: string[] = [];
        if (!resultados.correcto) {
          reqNoCumplidos.push('Correct');
        }
        if (!resultados.apropiado) {
          reqNoCumplidos.push('Appropriate');
        }
        if (!resultados.completo) {
          reqNoCumplidos.push('Complete');
        }
        if (!resultados.verificable) {
          reqNoCumplidos.push('Verifiable');
        }
        if (!resultados.factible) {
          reqNoCumplidos.push('Feasible');
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
            this._toasterService.error('Failed to update', 'Error');
            console.error('Failed to update requerimiento', error);
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
            this._toasterService.error('Failed to update', 'Error');
            console.error('Failed to update requerimiento', error);
          }
        );
      this._proyectoService.putProyecto({
        estado: 'F'
      }, this.idProyecto as number)
        .subscribe(
          value => {
          },
          error => {
            this._toasterService.error('Failed to update', 'Error');
            console.error('Failed to update requerimiento', error);
          }
        );

    })
  }

  mostrarMensajeEmergente() {
    const botonInfo = document.getElementById('btnInfo');
    const mensajeInfo = document.getElementById('mensajeInfo');
    if (botonInfo && mensajeInfo) {
      if(botonInfo?.style.display=="none") {
        botonInfo.style.display = "block";
        mensajeInfo.style.display = "none";
      } else {
        mensajeInfo.style.display = "block";
        botonInfo.style.display = "none";
      }
    }
  }
  myTabSelectedIndexChange(index: number) {
    console.log('Selected index: ' + index);
    if(index===1){
      this.valor=100;
      this.color='accent';
    }else{
      this.valor=50;
      this.color='primary';
    }
  }

}
