import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/producto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoryService } from 'src/app/services/category.service';
import { CongeneralService } from 'src/app/services/congeneral.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/product.service';

import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from "socket.io-client";


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;
  value: string;
  id:string;
  categories: Categoria[];
  public usuario: Usuario;

  public url;
  public identity;
  public productos : Array<any> = [];
  public filter;
  public carrito : Array<any> = [];
  public subtotal : any = 0;

  public socket = io('http://localhost:5000');

  constructor(
    public categoryService: CategoryService,
    public configuracionService: CongeneralService,
    public router: Router,
    public http: HttpClient,
    private messageService: MessageService,
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private _carritoService:CarritoService,
    private _productoService : ProductoService,
    private webSocketService: WebSocketService,
  ) {
    this.identity = usuarioService.usuario;
    this.url = environment.baseUrl;

    // this.socketWebService.outEven.subscribe()
   }




   ngOnInit(): void {
    // console.log("socket =============>>",this.socket);


    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
    this.obtenerCategorias();
    //this.links = document.querySelectorAll('.selector');//obtiene clase del div // se dispara despues de inicializado el componente

    if(this.identity){
      this.socket.on('new-carrito', function (data) {
        this.subtotal = 0;
        this.show_Carrito();

      }.bind(this));

      this.url = environment.baseUrl;
      this.activatedRoute.params.subscribe(
        params=>{
          this.filter = params['filter'];
        }
      )

      this.show_Carrito();

      this._productoService.listar_autocomplete().subscribe(
        response =>{

          if(response.data.length >= 1){
            response.data.forEach(element => {
              this.productos.push(element.titulo);


            });
          }

        },
        error=>{

        }
      );
    }else{
      this.obtenerCategorias();
      this.url = environment.baseUrl;
      this.activatedRoute.params.subscribe(
        params=>{
          this.filter = params['filter'];
        }
      )
    }
  }

  submitted = false;



  search_by_filter(){
    this.router.navigate(['/productos/search/',this.filter]);
  }

  show_Carrito(){
    this._carritoService.preview_carrito(this.identity._id).subscribe(
      response =>{
        this.carrito = response.carrito;

        this.carrito.forEach(element => {
          this.subtotal = this.subtotal + (element.precio*element.cantidad);
        });

      },
      error=>{
        console.log(error);

      }
    );
  }
  remove_producto(id){
    this._carritoService.remove_carrito(id).subscribe(
      response=>{
        this.subtotal = this.subtotal - (response.carrito.precio*response.carrito.cantidad);
        this._carritoService.preview_carrito(this.identity._id).subscribe(
          response =>{
            this.carrito = response.carrito;
            this.socket.emit('save-carrito_dos', {new:true});


          },
          error=>{
            console.log(error);

          }
        );
      },
      error=>{

      }
    );
  }


  obtenerCategorias(){
    return this.categoryService.getCategories().subscribe(
      resp=>{
        this.categories = resp;
        console.log(this.categories);
      }
    )
  }



  getItem():void{
    this.messageService.getMessage().subscribe((product:Producto)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product._id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);

      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);

    });
  }


  getItemsList(): any[]{

    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel)=>{
      item = {
        name: it.productName,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
        quantity: it.quantity,
        category: it.category,
      };
      items.push(item);
    });
    return items;
  }




  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  logout(){
    this.usuarioService.logout();
  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("sidemenu");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle('active');

      }
  }



}
