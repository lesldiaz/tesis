import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
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
  requerimientosPadre: RequerimientoInterface[] = [];
  rolSeleccionado: RolInterface | undefined;
  identificador: any;
  titulo: any;
  prioridad = 1;
  description: any;
  var = 0;
  datos: any[] = [];
  posit: any[] = [];
  blockEnvio: any[] = [];
  bandera: boolean = false;
  event: any;
  eliminarImg: any;
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
        id: 2
      }
    };
    let getReq$ = this._requerimientoService.getRequerimientosFiltro(0, 5, criterioBusqueda);
    getReq$
      .subscribe(
        (proyectos: any) => {
          if (typeof proyectos.mensaje !== 'string') {
            this.requerimientosPadre = proyectos.mensaje.resultado;
          }
        }
      );
  }

  mostrarPostIt(event: any) {
    this.event = event;
    this.bandera = false;
  }

  guardarInput() {
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
            console.log(requerimiento);
            requerimientoGuardar['idRequerimiento'] = requerimiento.idRequerimiento;
            requerimientoGuardar['rol'] = this.roles.find(rol => rol.id === requerimiento.rol);
            this.datos.push(requerimientoGuardar);
            this._toasterService.success('Requerimiento guardado correctamente', 'Éxito');
          }
        }, error => {
          this._toasterService.error('Ocurrió un error al guardar', 'Error');
        })
    } else {
      this.actualizar();
    }
    this.limpiar();
  }

  limpiar() {
    this.prioridad = 1;
    this.identificador.value = "";
    /* this.container.value='';
     this.selected='option2';*/
    this.titulo.value = '';
    this.description.value = '';
    this.bandera = true;
    this.posit = [];
    this.blockEnvio = [];
    this.eliminarImg.style.display = 'none';
  }

  select(event: any) {
    this.identificador.value = event.id;
    /*this.container.value=event.rol;
    this.selected=event.padre;*/
    this.titulo.value = event.titulo;
    this.description.value = event.descripcion;
    for (let post of event.postit) {
      for (let pst of post) {
        console.log(pst);
        this.blockEnvio.push(pst);
      }
    }
    console.log(this.blockEnvio)
    this.eliminarImg.style.display = '';
    this.bandera = false;

  }

  actualizar() {
    for (let i = 0; i < this.datos.length; i++) {
      const index = i;
      //console.log(index);
      //console.log(this.datos[i]);
      //console.log(this.datos[i].id);
      if (this.datos[i].id == this.identificador.value) {
        this.datos[i] = {
          "id": this.identificador.value,
          "rol": this.rolSeleccionado,
          "padre": this.reqPadreSeleccionado,
          "titulo": this.titulo.value,
          "prioridad": this.prioridad,
          "descripcion": this.description.value,
          "postit": this.posit
        };
      }
    }
    //console.log(this.datos)
    this.limpiar();
  }

  eliminar() {
    for (let i = 0; i < this.datos.length; i++) {
      const index = i;
      if (this.datos[i].id == this.identificador.value) {
        this.datos.splice(i, 1);
      }
    }
    this.limpiar();

  }

  cancelar() {
    this.eliminarImg = document.getElementById('eliminar');
    this.identificador = document.getElementById('id');
    this.titulo = document.getElementById('titulo');
    this.description = document.getElementById('textarea1');
    this.limpiar();
  }

}
