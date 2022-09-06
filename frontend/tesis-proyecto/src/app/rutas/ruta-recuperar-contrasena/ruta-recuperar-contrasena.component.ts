import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-ruta-recuperar-contrasena',
  templateUrl: './ruta-recuperar-contrasena.component.html',
  styleUrls: ['./ruta-recuperar-contrasena.component.css']
})
export class RutaRecuperarContrasenaComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private readonly _route: Router,
    private readonly _toasterService: ToastrService,
    private readonly _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  enviarCorreo() {
    if (this.nombreUsuario){
      this._usuarioService.recuperarContrasena(
        {
          nombreUsuario: this.nombreUsuario
        }
      ).subscribe(
          usuarioLogeado => {
            this._toasterService.success('Revisa tu bandeja de mensajes', 'Éxito');
            this._route.navigate(['login']);
          },
          error => {
            console.error(error);
          });
    }
  }
  irALogin() {
    const ruta = [ 'login']
    this._route.navigate(ruta);
  }
}
