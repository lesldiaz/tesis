import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FUNCIONES_GENERALES} from 'src/app/constantes/funciones-generales';
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
  @Input() datosCliente: RequerimientoInterface[] | undefined;
  roles: RolInterface[] = [];
  requerimientoSeleccionado: RequerimientoInterface | undefined;
  rolSeleccionado: RolInterface | any;
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
  reqPadreSeleccionado: RequerimientoInterface | any;


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
    this.datos = this.datosCliente as RequerimientoInterface[];
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
        requerimientoPadre: this.reqPadreSeleccionado as string,
        proposito: this.posit[0],
        proyecto: this.idProyecto as number,
      };
      this._requerimientoService.postRequerimientoMetodoGraficoB(requerimientoGuardar)
        .subscribe(async (requerimiento: any) => {
          if (requerimiento) {
            requerimientoGuardar['id'] = requerimiento.id;
            requerimientoGuardar['idRequerimiento'] = requerimiento.idRequerimiento;
            const rolGuardado = this.roles.find(rol => rol.id === requerimiento.rol);
            if (rolGuardado) {
              requerimientoGuardar['rol'] = rolGuardado;
            } else {
              this._rolService.getRol(requerimiento.rol)
                .subscribe(
                  (rolGuardado: any) => {
                    const rol = rolGuardado.mensaje.resultado;
                    this.roles.push(rol);
                    requerimientoGuardar['rol'] = rol;
                  }
                )
            }
            this.datos.push(requerimientoGuardar);
            this._toasterService.success('Requerimiento guardado correctamente', 'Éxito');
          }
        }, (error: any) => {
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
    this.requerimientoSeleccionado = $event as RequerimientoInterface;
    const rolSelect = this.roles.find(rol => {
      if (this.requerimientoSeleccionado?.rol) {
       if (rol.id === (this.requerimientoSeleccionado.rol as RolInterface).id) {
         return rol;
       }
      }
        return '';
    });
    const reqPadreSelect = this.requerimientoSeleccionado?.requerimientoPadre as RequerimientoInterface;
    this.identificador = document.getElementById('id');
    this.titulo = document.getElementById('titulo');
    this.description = document.getElementById('textarea1');
    this.posit.push(this.event);
    this.idRequerimientosSeleccionado = $event.id;
    this.identificador.value = this.requerimientoSeleccionado.idRequerimiento;
    this.reqPadreSeleccionado = reqPadreSelect? reqPadreSelect : undefined;
    this.rolSeleccionado = rolSelect? rolSelect : undefined;
    this.prioridad = this.requerimientoSeleccionado.prioridad as number;
    this.titulo.value = this.requerimientoSeleccionado.titulo;
    this.description.value = this.requerimientoSeleccionado.descripcion;
    const propositos = (this.requerimientoSeleccionado as any)?.proposito;
    console.log(propositos);
    if(propositos){
      for (let post of propositos) {
        this.blockEnvio.push(post);
      }
    }
    this.bandera = false;

    document.location.href ='nuevoproyecto/'+this.idProyecto+'#met-client-graph';
  }

  actualizar() {
    const requerimientoEditar: RequerimientoInterface = {
      id: this.idRequerimientosSeleccionado,
      idRequerimiento: this.identificador.value,
      titulo: this.titulo.value,
      rol: this.rolSeleccionado, //comprobar si es id o string nuevo
      prioridad: this.prioridad,
      descripcion: this.description.value,
      requerimientoPadre: this.reqPadreSeleccionado as string,
      proposito: this.posit[1],
      proyecto: this.idProyecto as number,
    };
    this._requerimientoService.putRequerimientoMetodoGraficoB(requerimientoEditar)
      .subscribe(async (requerimiento: any) => {
        if (requerimiento) {
          this.datos.map(
            (requerimiento, indice) => {
              if (requerimiento.id === this.idRequerimientosSeleccionado) {
                requerimientoEditar['rol'] = this.roles.find(rol => rol.id === requerimientoEditar.rol);
                this.datos[indice] = requerimientoEditar;
              }
            }
          );
          this._toasterService.success('Requerimiento editado correctamente', 'Éxito');
        }
      }, (error: any) => {
        this._toasterService.error('Ocurrió un error al editar', 'Error');
      });
    this.limpiar();
  }

  eliminar() {
    this._requerimientoService.deleteRequerimiento(this.idRequerimientosSeleccionado as number)
      .subscribe((value: any) => {
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
