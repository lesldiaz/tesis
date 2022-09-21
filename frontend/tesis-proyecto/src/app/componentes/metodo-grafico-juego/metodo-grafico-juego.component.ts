import {Component, OnInit, Input} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import {RequerimientoBloqueService} from 'src/app/servicios/requerimiento-bloque.service';
import {ResultadoInterface} from 'src/app/constantes/interfaces/resultado.interface';

@Component({
  selector: 'app-metodo-grafico-juego',
  templateUrl: './metodo-grafico-juego.component.html',
  styleUrls: ['./metodo-grafico-juego.component.css']
})
export class MetodoGraficoJuegoComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  @Input() datosBloque: RequerimientoInterface[] | undefined;
  requerimientoSeleccionado: RequerimientoInterface | undefined;
  idRequerimientosSeleccionado: number | undefined;
  datos: RequerimientoInterface[] = [];
  block: any[] = [];
  blockEnvio: any[] = [];
  bandera: boolean = false;
  identificador: any;
  descripcion: any;
  event: any;

  constructor(
    private readonly _requerimientoBloqueService: RequerimientoBloqueService,
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    const criterioBusqueda = {
      proyecto: {
        id: this.idProyecto
      }
    };
    this.datos = this.datosBloque as RequerimientoInterface[];
  }

  mostrarPostIt(event: any) {
    this.event = event;
    this.bandera = false;
  }

  guardar() {
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    this.block.push(this.event);
    console.log(this.block);
    const bloquesIngresados: any[] = [];
    this.block[0]
      .forEach((bloque: any) => {
        const reqBloque = {
          bloque: bloque
        }
        bloquesIngresados.push(reqBloque);
      });
    if (this.identificador.value == "") {
      const requerimientoGuardar: RequerimientoInterface = {
        descripcion: this.descripcion.value,
        requerimientoBloque: bloquesIngresados,
        proyecto: this.idProyecto as number,
      }
      this._requerimientoService.postRequerimientoMetodoGraficoJ(requerimientoGuardar)
        .subscribe(async (requerimiento: any) => {
          if (requerimiento) {
            requerimientoGuardar['id'] = requerimiento.id;
            requerimientoGuardar['idRequerimiento'] = requerimiento.idRequerimiento;
            this.datos.push(requerimientoGuardar);
            this._toasterService.success('Record saved successfully', 'Success');
          }
        }, error => {
          this._toasterService.error('An error occurred while saving', 'Error');
        });
    } else {
      this.actualizar();
    }
    this.limpiar();
  }

  limpiar() {
    this.requerimientoSeleccionado = undefined;
    this.identificador.value = "";
    this.descripcion.value = '';
    this.block = [];
    this.bandera = true;
    this.blockEnvio = [];
  }

  recuperarSeleccionado(event: any) {
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    this.requerimientoSeleccionado = event as RequerimientoInterface;
    this.idRequerimientosSeleccionado = event.id;
    this.identificador.value = event.idRequerimiento;
    this.descripcion.value = event.descripcion;
    for (let block of event.requerimientoBloque) {
      this.blockEnvio.push(block.bloque);
    }
    this.bandera = false;
    document.location.href ='nuevoproyecto/'+this.idProyecto+'#met-game-graph';
  }

  actualizar() {
    const bloquesActualizados: any[] = [];
    this.block[0]
      .forEach((bloque: any) => {
        const reqBloque = {
          bloque: bloque
        }
        bloquesActualizados.push(reqBloque);
      });
    const requerimientoEditar: RequerimientoInterface = {
      id: this.idRequerimientosSeleccionado,
      idRequerimiento: this.identificador.value,
      descripcion: this.descripcion.value,
      requerimientoBloque: bloquesActualizados,
      proyecto: this.idProyecto as number,
    };
    this._requerimientoService.putRequerimientoMetodoGraficoJ(requerimientoEditar)
      .subscribe(async (requerimiento: any) => {
        if (requerimiento) {
          this.datos.map(
            (requerimiento, indice) => {
              if (requerimiento.id === this.idRequerimientosSeleccionado) {
                this.datos[indice] = requerimientoEditar;
              }
            }
          );
          this._toasterService.success('Record edited successfully', 'Success');
        }
      }, error => {
        this._toasterService.error('An error occurred while editing', 'Error');
      });
    this.limpiar();
  }

  eliminar() {
    this._requerimientoService.deleteRequerimiento(this.idRequerimientosSeleccionado as number)
      .subscribe(value => {
        const requerimientoEliminar = this.datos.find(requerimiento => requerimiento.id === this.idRequerimientosSeleccionado);
        this.datos.indexOf(requerimientoEliminar as RequerimientoInterface) < 0
          ? this.datos
          : this.datos.splice(this.datos.indexOf(requerimientoEliminar as RequerimientoInterface), 1);
        this.requerimientoSeleccionado = undefined;
        this._toasterService.info('Record deleted successfully', 'Success');
      });
    this.limpiar();

  }

  cancelar() {
    this.identificador = document.getElementById('id');
    this.descripcion = document.getElementById('textarea1');
    this.limpiar();
  }

}
