import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public usuario;
  public url;
  public paises;
  public data_paises : any = [];
  public direccion = new Direccion('','','','','','','','');

  public msm_error = false;
  public msm_success = false;
  public direcciones : Direccion[];
  public direccion_data : any = {};
  public msm_success_dos = false;

  direccionid: Direccion;


  constructor(
    private usuarioService: UsuarioService,
    private _direccionService: DireccionService,
    private _router : Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.usuario = usuarioService.usuario;
    this.direccionid = _direccionService.direccionid;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.listar();
  }



  listar(){
    this._direccionService.listarUsuario(this.usuario.uid).subscribe(
      response =>{
        this.direcciones = response.direcciones;
        console.log(this.direcciones);
      },
      error=>{

      }
    );
  }

  get_direccion(_id){debugger
    this._direccionService.get_direccion(_id).subscribe(
      response =>{
        this.direccionid = response;
        console.log(this.direccionid);

      },
      error=>{

      }
    );
  }
  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_dos = false;
  }



  eliminar(id){
    this._direccionService.eliminar(id).subscribe(
      response=>{

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
      },
      error=>{

      }
    );
  }
}
