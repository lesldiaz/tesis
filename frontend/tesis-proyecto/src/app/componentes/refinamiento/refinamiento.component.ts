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
  bandera = true;
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
      pregunta: 'Are the requirements clear, is there no ambiguity?'
    },
    {
      header: 'Feasible',
      pregunta: 'Is the requirement feasible, that is, is it achievable despite the limitations of the system (for example, cost, schedule, and technical part) with acceptable risk? Does the requirement have any technical restrictions?'
    },
    {
      header: 'Correct',
      pregunta: 'Does the requirement represent the real need that the customer needs?'
    },
    {
      header: 'Appropriate',
      pregunta: 'Is the requirement within the scope of the project and does it reflect a real need?'
    },
    {
      header: 'Verifiable',
      pregunta: 'Is the requirement verifiable through a test case?'
    },
    {
      header: 'Complete',
      pregunta: 'Is the requirement complete, describing the client\'s need without the need to expand on it?'
    },
    {
      header: 'Necessary',
      pregunta: 'Is the requirement necessary, if it is not included as a requirement, will there be any deficiency for other requirements?'
    },
    {
      header: 'Singular',
      pregunta: 'Does the requirement establish a single characteristic, is it singular, or can it be broken down into several?'
    },
    {
      header: 'Conforming',
      pregunta: 'Does the requirement conform to the organization\'s standard?'
    },
    {
      header: 'Consistent',
      pregunta: 'Is the requirement consistent, does it not contradict other requirements or is it not repeated?'
    },
    {
      header: 'Modifiable',
      pregunta: 'Can the requirement be modifiable without altering other requirements or product scope?'
    },
    {
      header: 'Traceable',
      pregunta: 'Does the requirement have an original traceability that maintains the customer\'s need'
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
      pregunta: 'Does GamePlay card require clarification to be implemented, is it unambiguous?'
    },
    {
      header: 'Feasible',
      pregunta: 'Is it feasible to carry out this functionality in the technological platform that is going to be developed?'
    },
    {
      header: 'Correct',
      pregunta: 'Is GamePlay card related to the functionality that the user needs, according to its scope. It is correct?'
    },
    {
      header: 'Appropriate',
      pregunta: 'Is there synergy between the GamePlay card with the story/narrative/genre. Is there consistency, is it appropriate?'
    },
    {
      header: 'Verifiable',
      pregunta: 'Is the GamePlay verifiable?'
    },
    {
      header: 'Complete',
      pregunta: 'Does GamePlay card include gameplay BLOCKS. Is it complete respecting the format?'
    },
    {
      header: 'Necessary',
      pregunta: 'Does GamePlay card need to be implemented?'
    },
    {
      header: 'Singular',
      pregunta: 'GamePlay card cannot be divided into other functionalities, is it singular?'
    },
    {
      header: 'Conforming',
      pregunta: 'Is the functional design of the game that contains the GamePlay card in accordance with all opinions of the participants?'
    },
    {
      header: 'Consistent',
      pregunta: 'Is GamePlay card consistent, does it not contradict the initial proposed design of the game?'
    },
    {
      header: 'Modifiable',
      pregunta: 'Can GamePlay card be upgraded or modified?'
    },
    {
      header: 'Traceable',
      pregunta: 'Does GamePlay card maintain its traceability while respecting game design principle?'
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
    this.bandera = this.tipoProyecto === 'C' ? true : false;
    this.bnd = document.getElementById("bar-control");
    if(this.bandera===false){
      this.bnd.style.display="";
    }else{
      this.bnd.style.display="none";
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
