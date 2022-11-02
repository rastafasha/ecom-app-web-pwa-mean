import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria.model';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';

import { PageService } from 'src/app/services/page.service';
import { About } from 'src/app/models/page';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;

  pagina: About;
  paginarecientes: About[];
  categories: Categoria[];

  configuraciones: Congeneral;
  configuracion: Congeneral;


  constructor(
    public pageService: PageService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService,
    private messageService: MessageService,
    public configuracionService: CongeneralService,
  ) { }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerPage(id));
    this.obtenerCategorias();
    this.obtenerPageRecent();
  }

  obtenerPage(_id:string){
    this.pageService.getPage(_id).subscribe(
      resp=>{
        this.pagina = resp;
        console.log(this.pagina);
      }
    )
  }

  obtenerPageRecent(){
    this.pageService.getPages().subscribe(
      resp=>{
        this.paginarecientes = resp;
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

}
