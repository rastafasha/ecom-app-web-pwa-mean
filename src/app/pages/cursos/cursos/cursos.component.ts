import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { CursoService } from 'src/app/services/curso.service';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { Curso } from 'src/app/models/curso.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos: Curso[] =[];
  public curso: Curso;

  p: number = 1;
  count: number = 8;

  error!: string;

  configuracion: Congeneral;

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public cursoService: CursoService,
    public configuracionService: CongeneralService,
    private messageService: MessageService,
    private router: Router,
    handler: HttpBackend,
  ) {
    this.http = new HttpClient(handler);

   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadProducts();



  }
  loadProducts(){
    this.cursoService.getCursos().subscribe(
      cursos => {
        this.cursos = cursos;
        console.log(this.cursos);
      }
    )
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessageCurso(this.curso);
  }

}
