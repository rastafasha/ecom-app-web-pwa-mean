import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { CursoService } from 'src/app/services/curso.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria.model';
import { Curso } from 'src/app/models/curso.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: Curso;
  categories: Categoria[];
  imagenSerUrl = environment.mediaUrl;

  _id:string;

  constructor(
    public cursoService: CursoService,
    public categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public router: Router,
    private sanitizer: DomSanitizer

  ) {
   }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerCurso(id));
    this.obtenerCategorias();
  }

  obtenerCurso(_id:string){
    this.cursoService.getCurso(_id).subscribe(
      resp=>{
        this.curso = resp;
        console.log(this.curso);
      }
    )
  }

  obtenerCategorias(){
    return this.categoryService.getCategories().subscribe(
      resp=>{
        this.categories = resp;
        console.log(this.categories);
      }
    )
  }

  addToCart(): void{
    console.log('sending curso...')
    this.messageService.sendMessageCurso(this.curso);
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}


}
