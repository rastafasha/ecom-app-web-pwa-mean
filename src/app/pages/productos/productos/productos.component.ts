import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/product.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: Producto[]=[];
  public product: Producto;


  error!: string;

  p: number = 1;
  count: number = 8;

  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    handler: HttpBackend,
    private messageService: MessageService
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadProducts();
    window.scrollTo(0,0);


  }
  loadProducts(){
    this.productoService.getProductos().subscribe(
      productos => {
        this.productos = productos;
        console.log(this.productos);
      }
    )
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

}
