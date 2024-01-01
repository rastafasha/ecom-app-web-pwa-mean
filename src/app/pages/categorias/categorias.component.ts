import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/product.service';
import { Categoria, CatProducModel } from 'src/app/models/categoria.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public productos: any;
  public product: Producto;
  public producto : any = {};

  categories: Categoria[];
  categoria: Categoria;
  categoriaId: any;

  nombre:string;
  id:string;

  error!: string;

  p: number = 1;
  count: number = 8;


  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;


  constructor(
    public productoService: ProductoService,
    private router: Router,
    handler: HttpBackend,
    private messageService: MessageService,
    public categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);

    // this.obtenerCategoriasByNombre();

    // this.activatedRoute.params.subscribe( ({id}) => this.obtenerItemCategoria(id));

    // this.activatedRoute.params.subscribe(
    //   params=>{
    //     this.nombre = params['nombre'];

    //     // this.obtenerItemCategoria();
    //   }
    // );

    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.categoriaId = resp;
      this.obtenerItemCategoria();
      
    });

  }
  obtenerItemCategoria(){debugger
    this.productoService.listar_productoCat(this.categoriaId).subscribe(
      res => {
        this.productos = res;
        console.log(this.productos);
      }
    )
  }

  // obtenerCategoriasByNombre(){
  //   return this.categoryService.find_by_nombre(this.categoria.nombre).subscribe(
  //     resp=>{
  //       this.categoria = resp;
  //       console.log(this.categoria);
  //     }
  //   )
  // }

}
