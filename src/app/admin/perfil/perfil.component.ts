import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

declare var jQuery:any;
declare var $:any;

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public url;
  public user : any = {};
  public paises;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public data_paises : any = [];
  public msm_error = false;
  public msm_success = false;
  public pass_error = false;

  public usuario: Usuario;

  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;

  //DATA
  public new_password = '';
  public comfirm_password = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
    this.url = environment.baseUrl;

  }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.perfilForm = this.fb.group({
      email: [ this.usuario.email, Validators.required ],
      first_name: [ this.usuario.first_name, Validators.required ],
      last_name: [ this.usuario.last_name, Validators.required ],
      numdoc: [ this.usuario.numdoc ],
      telefono: [ this.usuario.telefono ],
      pais: [ this.usuario.pais],
      google: [ this.usuario.google],
      role: [ this.usuario.role],
    });
    if(this.usuario){
      this.http.get('https://restcountries.com/v2/all').subscribe(
        data => {

          this.paises = data;
          this.paises.forEach(element => {
              this.data_paises.push(element.name);

          });

        }
      );
    }else{
      this._router.navigate(['/']);
    }
  }

  close_alert(){
    this.msm_success = false;
    this.msm_error = false;
  }

  view_password(){
    let type = $('#password').attr('type');

    if(type == 'text'){
      $('#password').attr('type','password');

    }else if(type == 'password'){
      $('#password').attr('type','text');
    }
  }

  view_password2(){
    let type = $('#password_dos').attr('type');

    if(type == 'text'){
      $('#password_dos').attr('type','password');

    }else if(type == 'password'){
      $('#password_dos').attr('type','text');
    }
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp => {
      const {first_name, last_name, telefono, pais,  numdoc, email} = this.perfilForm.value;
      this.usuario.first_name = first_name;
      this.usuario.last_name = last_name;
      this.usuario.telefono = telefono;
      this.usuario.numdoc = numdoc;
      this.usuario.pais = pais;
      Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
    }, (err)=>{
      Swal.fire('Error', err.error.msg, 'error');

    })
  }


  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => { this.usuario.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }


}
