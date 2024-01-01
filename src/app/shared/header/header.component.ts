import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, DoCheck } from '@angular/core';
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
import { CursoService } from 'src/app/services/curso.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

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
  public cursos : Array<any> = [];
  public filter;
  public carrito : Array<any> = [];
  public subtotal : any = 0;

  public socket = io(environment.soketServer);

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
    private cursoService : CursoService,
    private webSocketService: WebSocketService,
  ) {
    this.identity = usuarioService.usuario;
    this.url = environment.baseUrl;

    // this.socketWebService.outEven.subscribe()
   }


   ngDoCheck(): void {
    this.identity = this.usuarioService.usuario;
  }




   ngOnInit(): void {



    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
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

      this._productoService.getProductos().subscribe(
        response =>{
          this.productos = response;

          if(this.productos.length >= 1){
            this.productos.forEach(element => {
              this.productos.push(element.titulo);
            });
          }

        },
        error=>{

        }
      );

      this.cursoService.getCursos().subscribe(
        response =>{
          this.cursos = response;

          if(this.cursos.length >= 1){
            this.cursos.forEach(element => {
              this.cursos.push(element.titulo);
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



  search_by_filter(termino: string){

    if(termino.length === 0){
      return;
    }

    this.router.navigateByUrl(`../search/${termino}`);
    // this.router.navigate(['../search/',this.filter]);
  }

  show_Carrito(){
    this._carritoService.preview_carrito(this.identity.uid).subscribe(
      response =>{
        this.carrito = response;

        this.carrito.forEach(element => {
          this.subtotal = this.subtotal + (element.precio*element.cantidad);
        });
        console.log(this.carrito);

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
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response;
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
        // console.log(this.categories);
      }
    )
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

  openBuscar(){

    var menuLateral = document.getElementsByClassName("btn-open-search-form");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.add('open');

      }
  }



}
