import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.css']
})
export class ProductsFeaturedComponent implements OnInit {

  public productos: Producto[]=[];


  error!: string;


  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadProducts();


  }
  loadProducts(){
    this.productoService.getProductos().subscribe(
      productos => {
        this.productos = productos;
        console.log(this.productos);
      }
    )
  }

  gotoPage(){
    return this.router.navigateByUrl('/producto')
  }

  gotoProduct(_id:string ) {
    this.productoService.getProductoById(_id).subscribe(
      res =>{
        this.router.navigateByUrl('/producto/'+_id);

      }
    );
  }


}
