import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { FUNCIONES_GENERALES } from 'src/app/constantes/funciones-generales';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';
import {RolInterface} from 'src/app/constantes/interfaces/rol.interface';
import {RequerimientoService} from 'src/app/servicios/requerimiento.service';
import {RolService} from 'src/app/servicios/rol.service';

@Component({
  selector: 'app-metodo-grafico-cliente',
  templateUrl: './metodo-grafico-cliente.component.html',
  styleUrls: ['./metodo-grafico-cliente.component.css']
})
export class MetodoGraficoClienteComponent implements OnInit {
  @Input() idProyecto: number | undefined;
  roles: RolInterface[] = [];
  requerimientoSeleccionado: RequerimientoInterface | undefined;
  requerimientosPadre: RequerimientoInterface[] = [];
  rolSeleccionado: RolInterface | undefined;
  identificador: any;
  idRequerimientosSeleccionado: number | undefined;
  titulo: any;
  prioridad = 1;
  description: any;
  var = 0;
  datos: any[] = [];
  posit: any[] = [];
  blockEnvio: any[] = [];
  bandera: boolean = false;
  event: any;
  reqPadreSeleccionado: RequerimientoInterface | undefined;


  constructor(
    private readonly _rolService: RolService,
    private readonly _requerimientoService: RequerimientoService,
    private readonly _toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this._rolService.getAllRoles()
      .subscribe(
        (roles: any) => {
          if (typeof roles.mensaje !== 'string') {
            this.roles = roles.mensaje.resultado;
          }
        }
      );
    const criterioBusqueda = {
      proyecto: {
        id: this.idProyecto
      }
    };
    let getReq$ = this._requerimientoService.getRequerimientosFiltro(0, 0, criterioBusqueda);
    getReq$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            this.requerimientosPadre = proyectos.mensaje.resultado;
            const requerimientosProyecto = proyectos.mensaje.resultado;
            requerimientosProyecto.forEach(
              (requerimiento: any) => {
                if (!requerimiento.esReqBloque){
                  this.datos.push(requerimiento);
                }
              }
            );
          }
        }
      );
  }

  mostrarPostIt(event: any) {
    this.event = event;
    this.bandera = false;
  }

  guardarRequerimiento() {
    this.identificador = document.getElementById('id');
    this.titulo = document.getElementById('titulo');
    this.description = document.getElementById('textarea1');
    this.posit.push(this.event);
    if (this.identificador.value == "") {
      const requerimientoGuardar: RequerimientoInterface = {
        titulo: this.titulo.value,
        rol: this.rolSeleccionado, //comprobar si es id o string nuevo
        prioridad: this.prioridad,
        descripcion: this.description.value,
        requerimientoPadre: this.reqPadreSeleccionado as number,
        proposito: [...this.posit],
        proyecto: this.idProyecto as number,
      };
      this._requerimientoService.postRequerimientoMetodoGraficoB(requerimientoGuardar)
        .subscribe(async (requerimiento: any) => {
          if (requerimiento) {
            requerimientoGuardar['id'] = requerimiento.id;
            requerimientoGuardar['idRequerimiento'] = requerimiento.idRequerimiento;
            requerimientoGuardar['rol'] = this.roles.find(rol => rol.id === requerimiento.rol);
            this.datos.push(requerimientoGuardar);
            this._toasterService.success('Requerimiento guardado correctamente', 'Éxito');
          }
        }, error => {
          this._toasterService.error('Ocurrió un error al guardar', 'Error');
        });
    } else {
      this.actualizar();
    }
    this.limpiar();
  }

  limpiar() {
    this.prioridad = 1;
    this.requerimientoSeleccionado = undefined;
    this.rolSeleccionado = undefined;
    this.reqPadreSeleccionado = undefined;
    this.identificador.value = "";
    this.titulo.value = '';
    this.description.value = '';
    this.bandera = true;
    this.posit = [];
    this.blockEnvio = [];
  }

  recuperarSeleccionado($event: any) {
    this.requerimientoSeleccionado =  $event as RequerimientoInterface;
    this.idRequerimientosSeleccionado = $event.id;
    this.identificador.value = this.requerimientoSeleccionado.idRequerimiento;
    this.reqPadreSeleccionado = this.requerimientoSeleccionado.requerimientoPadre as RequerimientoInterface;
    this.rolSeleccionado = this.roles.find(rol => rol.id === ((this.requerimientoSeleccionado as RequerimientoInterface).rol as RolInterface).id);
    this.prioridad = this.requerimientoSeleccionado.prioridad as number;
    this.titulo.value = this.requerimientoSeleccionado.titulo;
    this.description.value = this.requerimientoSeleccionado.descripcion;
    for (let post of (this.requerimientoSeleccionado as any).proposito) {
      for (let pst of post) {
        this.blockEnvio.push(pst);
      }
    }
    this.bandera = false;
  }

  actualizar() {
    const requerimientoEditar: RequerimientoInterface = {
      id: this.idRequerimientosSeleccionado,
      idRequerimiento: this.identificador.value,
      titulo: this.titulo.value,
      rol: this.rolSeleccionado, //comprobar si es id o string nuevo
      prioridad: this.prioridad,
      descripcion: this.description.value,
      requerimientoPadre: this.reqPadreSeleccionado as number,
      proposito: [...this.posit],
      proyecto: this.idProyecto as number,
    };
    this._requerimientoService.putRequerimientoMetodoGraficoB(requerimientoEditar)
      .subscribe(async (requerimiento: any) => {
        if (requerimiento) {
          this.datos.map(
            (requerimiento, indice) => {
              if (requerimiento.id === this.idRequerimientosSeleccionado){
                this.datos[indice] =  requerimientoEditar;
              }
            }
          );
          this._toasterService.success('Requerimiento editado correctamente', 'Éxito');
        }
      }, error => {
        this._toasterService.error('Ocurrió un error al editar', 'Error');
      });
    this.limpiar();
  }

  eliminar() {
   this._requerimientoService.deleteRequerimiento(this.idRequerimientosSeleccionado as number)
     .subscribe(value => {
       const requerimientoEliminar = this.datos.find(requerimiento => requerimiento.id === this.idRequerimientosSeleccionado);
       this.datos.indexOf(requerimientoEliminar) < 0
         ? this.datos
         : this.datos.splice(this.datos.indexOf(requerimientoEliminar), 1);
       this.requerimientoSeleccionado = undefined;
       this._toasterService.info('Eliminado correctamente', 'Éxito');
     });
    this.limpiar();
  }

  cancelar() {
    this.identificador = document.getElementById('id');
    this.titulo = document.getElementById('titulo');
    this.description = document.getElementById('textarea1');
    this.limpiar();
  }
}
