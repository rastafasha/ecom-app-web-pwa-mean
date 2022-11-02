import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria.model';
import { Congeneral } from 'src/app/models/congeneral.model';
import { CongeneralService } from 'src/app/services/congeneral.service';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;

  blog: Blog;
  blogrecientes: Blog[];
  categories: Categoria[];

  configuraciones: Congeneral;
  configuracion: Congeneral;


  constructor(
    public blogService: BlogService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService,
    private messageService: MessageService,
    public configuracionService: CongeneralService,
  ) { }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerBlog(id));
    this.obtenerCategorias();
    this.obtenerBlogRecent();
  }

  obtenerBlog(_id:string){
    this.blogService.getBlogById(_id).subscribe(
      resp=>{
        this.blog = resp;
        console.log(this.blog);
      }
    )
  }

  obtenerBlogRecent(){
    this.blogService.getBlogs().subscribe(
      resp=>{
        this.blogrecientes = resp;
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
