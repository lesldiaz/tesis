import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UsuarioService} from '../../../servicios/usuario.service';
import {ModalCrearEditarUsuarioComponent} from '../../../modales/modal-crear-editar-usuario/modal.crear-editar-usuario.component';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: 'listar.usuario.component.html',
  styleUrls: ['listar.usuario.component.sass']
})
export class ListarUsuarioComponent implements OnInit{
  usuarios: any[] = [];
  cols: any[] = [
    {field: 'cedula', header: 'Cedula'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'},
    {field: 'direccion', header: 'Dirección'},
    {field: 'telefono', header: 'Teléfono'},
    {field: 'id', header: 'Opciones'}
  ];
  total: number = 0;
  filaSeleccionada: number = 0;
  formularioBuscarUsuario: FormGroup;
  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _route: Router,
              private readonly _dialog: MatDialog,
              private readonly _activatedRoute: ActivatedRoute) {
    this.formularioBuscarUsuario = new FormGroup({
      filtro: new FormControl('cedula'),
      terminoBusqueda: new FormControl('')
      });
  }
  ngOnInit(): void {
    this.escucharCambiosCampoTerminoBusqueda();
  }

  escucharCambiosCampoTerminoBusqueda() {
    const campoTerminoBusqueda$ = this.formularioBuscarUsuario.get('terminoBusqueda');
    campoTerminoBusqueda$?.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(valorTerminoBusqueda => {
        const campoFiltro = this.formularioBuscarUsuario.get('filtro')?.value;
        const campoBusqueda = valorTerminoBusqueda;
        if (campoBusqueda) {
          const queryBusqueda: any = {};
          if (campoFiltro === 'cedula') {
            queryBusqueda['cedula'] = campoBusqueda;
          } else if (campoFiltro === 'nombre') {
            queryBusqueda['nombre'] = campoBusqueda;
          }
          this._route.navigate(['/usuario'], {queryParams: queryBusqueda});
        } else {
          this._route.navigate(['/usuario']);
        }
      });
  }
  cargarMasDatos($event: any) {
    this._activatedRoute.queryParams.subscribe(
      parametroRuta =>  {
        let getUsuarios$;
        if (parametroRuta) {
          getUsuarios$ = this._usuarioService.getUsuarios($event.first, 5, parametroRuta);
        } else {
          getUsuarios$ = this._usuarioService.getUsuarios($event.first, 5);
        }
        getUsuarios$
            .subscribe(
              (usuarios: any) => {
                console.log(usuarios);
                this.usuarios = usuarios.mensaje.resultado;
                this.total = usuarios.mensaje.totalResultados;
              },
              error => {
                console.error(error);
              }
            );
      }
    );
  }

  cambiarEstado(usuario: any) {
    this._usuarioService.putUsuarios({estado: !usuario.estado}, usuario.id)
      .subscribe(respuesta => {
          usuario.estado = !usuario.estado;
          this.filaSeleccionada = usuario.id;
        },
        error => {
          console.error('Error actualizar estado', error);
        });
  }

  abrirModalCrear() {
    const modalCrear = this._dialog.open(ModalCrearEditarUsuarioComponent, {
      width: '800px',
      data: false
    });
    modalCrear.afterClosed()
      .subscribe(
        (respuestaModalCrear: any) => {
          if (respuestaModalCrear) {
            this._usuarioService.postUsuarios(respuestaModalCrear)
              .subscribe(
                value => {
                  this.usuarios.unshift(value);
                  if (this.usuarios.length > 5) {
                    this.usuarios.pop();
                  }
                  this.filaSeleccionada = this.usuarios[0].id;
                },
                error => {
                  console.error('Error al crear usuario', error);
                }
              );
          }
        },
        (error: any) => {
          console.error('Error despues de cerrar modal', error);
        }
      );
  }

  abrirModalEditar(filaUsuario: any) {
    const modalEditar = this._dialog.open(ModalCrearEditarUsuarioComponent, {
      width: '800px',
      data: filaUsuario
    });
    modalEditar.afterClosed()
      .subscribe(
        (usuarioActualizado: any) => {
          if (usuarioActualizado) {
            this._usuarioService.putUsuarios(usuarioActualizado, filaUsuario.id)
              .subscribe(
                value => {
                  filaUsuario.nombre = usuarioActualizado.nombre;
                  filaUsuario.apellido = usuarioActualizado.apellido;
                  filaUsuario.direccion = usuarioActualizado.direccion;
                  filaUsuario.telefono = usuarioActualizado.telefono;
                  this.filaSeleccionada = filaUsuario.id;
                },
                error => {
                  console.error('Error al actualizar usuario', error);
                }
              );
          }
        },
        (error: any) => {
          console.error('Error al cerrar modal editar', error);
        }
      );
  }

  enviarFormularioBuscarUsuario() {
    const campoFiltro = this.formularioBuscarUsuario.get('filtro')?.value;
    const campoBusqueda = this.formularioBuscarUsuario.get('terminoBusqueda')?.value;
    if (campoBusqueda) {
      const queryBusqueda: any = {};
      if (campoFiltro === 'cedula') {
        queryBusqueda['cedula'] = campoBusqueda;
      } else if (campoFiltro === 'nombre') {
        queryBusqueda['nombre'] = campoBusqueda;
      }
      this._route.navigate(['/usuario'], {queryParams: queryBusqueda});
    } else {
      this._route.navigate(['/usuario']);
    }

  }
}
