import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ContactoService } from 'src/app/services/contacto.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{


  configuraciones: Congeneral[]=[];
  configuracion: Congeneral;
  configuracionDireccion:string;

  public url;
  public general;
  public contacto = {
    nombres:'',
    correo: '',
    telefono: '',
    tema:'',
    mensaje:''
  };
  public msm_success=false;
  public msm_error=false;


  constructor(
    public configuracionService: CongeneralService,
    public activatedRoute: ActivatedRoute,
    private _contactoService : ContactoService,
    public sanitizer: DomSanitizer,
    private http: HttpClient
    ) {
      this.configuracion = this.configuracionService.congeneral;
    }


  ngOnInit(): void {
  window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerConfiguracion(id));
  }
  obtenerConfiguracion(_id:string){
    this.configuracionService.getCongeneralById('5f25bd8015655fee54a89691').subscribe(
      resp=>{
        this.configuracion = resp;
        console.log(this.configuracion);
      }
    )
  }


  getMapIframe(url) {
    var mapa, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    mapa   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?' + mapa);
}

onSubmit(contactoForm){


  if(!contactoForm.valid){
    this.msm_error = true;
    this.msm_success = false;
  }else{
    let data = {
      nombres:contactoForm.value.nombres,
      correo: contactoForm.value.correo,
      telefono: contactoForm.value.telefono,
      tema:contactoForm.value.tema,
      mensaje:contactoForm.value.mensaje
    }


    this._contactoService.registro(data).subscribe(
      response =>{

        this.contacto = {
          nombres:'',
          correo: '',
          telefono: '',
          tema:'',
          mensaje:''
        }
        this.msm_success = true;
        this.msm_error = false;
      },
      error=>{

        this.msm_success = false;
        this.msm_error = true;
      }
    );



  }

  this.envioCorreo(contactoForm);


}

envioCorreo(contactoForm){

  let data = {
    nombres:contactoForm.value.nombres,
    correo: contactoForm.value.correo,
    telefono: contactoForm.value.telefono,
    tema:contactoForm.value.tema,
    mensaje:contactoForm.value.mensaje
  }
  console.log(data);
  this.http.post('http://localhost:5000/api/contactos/send/', data ).subscribe(res=>{
    console.log(res);


  })
}







}
