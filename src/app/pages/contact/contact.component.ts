import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{


  configuraciones: Congeneral[]=[];
  configuracion: Congeneral;
  url:string;
  configuracionDireccion:string;


  constructor(
    public configuracionService: CongeneralService,
    public activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
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





}
