
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  usuario: Usuario;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public router: Router,
    public http: HttpClient,
    private usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }





}
