import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-aside-cuenta',
  templateUrl: './aside-cuenta.component.html',
  styleUrls: ['./aside-cuenta.component.css']
})
export class AsideCuentaComponent implements OnInit {

  public url;
  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

}
