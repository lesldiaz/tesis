import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuarioInterface } from 'src/app/constantes/interfaces/usuario.interface';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  migasPan: MenuItem[]=[];
  usuarioActual: UsuarioInterface | undefined;
  nombreUsuario = 'Invitado';

  constructor(
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.migasPan = [
      {
          label: 'Perfil del Usuario'
      }
    ];
    this.usuarioActual = this._authService.currentUserValue as UsuarioInterface;
    if (this.usuarioActual) {
      this.nombreUsuario = this.usuarioActual.nombreUsuario;
    }
  }

}
