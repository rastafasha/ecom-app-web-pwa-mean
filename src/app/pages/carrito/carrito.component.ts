import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarritoService } from "src/app/services/carrito.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/product.service';
import {environment} from 'src/environments/environment';

import { CuponService } from "src/app/services/cupons.service";
import { PostalService } from "src/app/services/postal.service";
import { DireccionService } from "src/app/services/direccion.service";
import { VentaService } from "src/app/services/venta.service";

declare var paypal;


declare var jQuery:any;
declare var $:any;

import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from "socket.io-client";
import { Direccion } from '../../models/direccion.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @ViewChild('paypal',{static:true}) paypalElement : ElementRef;



  public direcciones;
  public identity;
  public carrito : Array<any> = [];
  public subtotal : any = 0;
  public url;
  public cupon;
  public msm_error_cupon=false;
  public msm_success_cupon=false;
  public new_data_descuento;
  public data_keyup = 0;
  public data_save_carrito;
  public msm_error = '';
  public productos : any = {};
  public cursos : any = {};

  public paypal;

  public postales;

  public precio_envio;

  public socket = io(environment.soketServer);

  public no_direccion = 'no necesita direccion';


  //DATA
  public radio_postal;
  public medio_postal : any = {};
  public data_cupon;
  public id_direccion = '';
  public direccion : any;
  public data_direccion : any = {};
  public data_detalle : Array<any> = [];
  public data_venta : any = {};
  public info_cupon_string = '';
  public error_stock = false;
  public date_string;

  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _productoService : ProductoService,
    private _carritoService:CarritoService,
    private _cuponService :CuponService,
    private _postalService :PostalService,
    private _direccionService :DireccionService,
    private _ventaService :VentaService,
    private webSocketService: WebSocketService,
    private cursoService: CursoService

  ) {
    this.identity = _userService.usuario;
    this.url = environment.baseUrl;
  }

  ngOnInit(): void {

    this.get_direccion();
    if(this.identity){
      this.socket.on('new-stock', function (data) {
        this.listar_carrito();

      }.bind(this));

      $('#card-pay').hide();
      $('#btn-back-data').hide();
      $('#card-data-envio').hide();
      this.listar_postal();
      this.listar_carrito();

      this.listar_direcciones();

        paypal.Buttons({

          createOrder: (data,actions)=>{
            //VALIR STOCK DE PRODUCTOS
            this.data_venta.detalles.forEach(element => {
                if(element.producto.stock == 0){
                  this.error_stock = true;
                }else{
                  this.error_stock = false;
                }

                if(element.curso.stock == 0){
                  this.error_stock = true;
                }else{
                  this.error_stock = false;
                }
            });

            if(!this.error_stock){
              return actions.order.create({
                purchase_units : [{
                  description : 'Compra en Linea',
                  amount : {
                    currency_code : 'USD',
                    value: Math.round(this.subtotal),
                  }

                }]
              });
            }else{
              this.error_stock = true;
              this.listar_carrito();
            }
          },
          onApprove : async (data,actions)=>{
            const order = await actions.order.capture();
            console.log(order);
            this.data_venta.idtransaccion = order.purchase_units[0].payments.captures[0].id;
            this._ventaService.registro(this.data_venta).subscribe(
              response =>{
                this.data_venta.detalles.forEach(element => {
                  console.log(element);
                  this._productoService.aumentar_ventas(element.producto._id).subscribe(
                    response =>{
                    },
                    error=>{
                      console.log(error);

                    }
                  );
                    this._productoService.reducir_stock(element.producto._id,element.cantidad).subscribe(
                      response =>{
                        this.remove_carrito();
                        this.listar_carrito();
                        this.socket.emit('save-carrito', {new:true});
                        this.socket.emit('save-stock', {new:true});
                        this._router.navigate(['/app/cuenta/ordenes']);
                      },
                      error=>{
                        console.log(error);

                      }
                    );

                    this.cursoService.aumentar_ventas(element.curso._id).subscribe(
                      response =>{
                      },
                      error=>{
                        console.log(error);

                      }
                    );



                });

              },
              error=>{
                console.log(error);

              }
            );
          },
          onError : err =>{
            console.log(err);

          }
        }).render(this.paypalElement.nativeElement);
      //
      this.url = environment.baseUrl;

      this.carrito_real_time();

    }else{
      this._router.navigate(['/']);
    }

  }

  remove_carrito(){
    this.carrito.forEach((element,index) => {
        this._carritoService.remove_carrito(element._id).subscribe(
          response =>{
            this.listar_carrito();
          },
          error=>{
            console.log(error);
          }
        );
    });
  }

  getCursos(){
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
  }

  carrito_real_time(){
    this.socket.on('new-carrito_dos', function (data) {
      this.subtotal = 0;

      this._carritoService.preview_carrito(this.identity.uid).subscribe(
        response =>{
          this.carrito = response;

          this.carrito.forEach(element => {
            this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
          });

        },
        error=>{
          console.log(error);

        }
      );

    }.bind(this));
  }

  listar_postal(){
    this._postalService.listar().subscribe(
      response =>{
        this.postales = response.postales
        this.postales.forEach((element,index) => {
          if(index == 0){
            this.radio_postal = element._id;
            this.medio_postal = {
              tipo_envio : element.titulo,
              precio: element.precio,
              tiempo: element.tiempo,
              dias : element.dias
            };
            this.precio_envio = element.precio;
          }
        });

      },
      error=>{

      }
    );
  }

  listar_direcciones(){
    this._direccionService.listarUsuario(this.identity.uid).subscribe(
      response =>{
        this.direcciones = response.direcciones;
      },
      error=>{

      }
    );
  }


  listar_carrito(){
    this._carritoService.preview_carrito(this.identity.uid).subscribe(
      response =>{
        this.carrito = response;
        this.subtotal = 0;
        this.carrito.forEach(element => {
          this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
          this.data_detalle.push({
            producto : element.producto,
            curso : element.curso,
            cantidad: element.cantidad,
            precio: Math.round(element.precio),
            color: element.color,
            selector : element.selector
          })
          console.log(this.carrito);

        });
        this.subtotal = Math.round(this.subtotal + parseInt(this.precio_envio));

      },
      error=>{
        console.log(error);

      }
    );
    this.getCursos();
  }



  remove_producto(id){
    this._carritoService.remove_carrito(id).subscribe(
      response=>{
        this.subtotal = Math.round(this.subtotal - (response.carrito.precio*response.carrito.cantidad));
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response;
            this.socket.emit('save-carrito', {new:true});
            this.listar_carrito();
          },
          error=>{
            console.log(error);

          }
        );
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response.carrito;
            this.data_detalle = [];
            this.carrito.forEach(element => {
              this.data_detalle.push({
                producto : element.producto,
                curso : element.curso,
                cantidad: element.cantidad,
                precio: element.precio,
                color: element.color,
                selector : element.selector
              })
            });
            console.log(this.data_detalle);


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

  get_direccion(){

    this._direccionService.get_direccion(this.id_direccion).subscribe(
      response =>{
        this.data_direccion = response;
        console.log(this.data_direccion);
      }
    );

  }

  get_data_cupon(event,cupon){
    this.data_keyup = this.data_keyup + 1;

    if(cupon){
      if(cupon.length == 13){
        console.log('siii');

        this._cuponService.get_cupon(cupon).subscribe(
          response =>{
            this.data_cupon = response.cupone;

            this.msm_error_cupon = false;
            this.msm_success_cupon = true;

            this.carrito.forEach((element,indice) => {
                if(response.cupone.tipo == 'subcategoria'){
                  if(response.cupone.subcategoria == element.producto.subcategoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.cupone.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }
                  }
                }
                if(response.cupone.tipo == 'categoria'){
                  if(response.cupone.categoria == element.producto.categoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.cupone.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }

                  }
                }
            });

          },
          error=>{
            this.data_keyup = 0;
            this.msm_error_cupon = true;

            this.msm_success_cupon = false;
            this.listar_carrito();
            this.listar_postal();
          }
        );
      }else{
        console.log('nooo');

        this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

      }
    }else{
      this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

    }

  }

  select_postal(event,data){
    //RESTAR PRECIO POSTAL ANTERIOR
    this.subtotal = Math.round(this.subtotal - parseInt(this.medio_postal.precio));

    this.medio_postal = {
      tipo_envio : data.titulo,
      precio: data.precio,
      tiempo: data.tiempo,
      dias: data.dias,
    }
    this.subtotal = Math.round(this.subtotal + parseInt(this.medio_postal.precio));

  }

  verify_data(){
    if(this.id_direccion){
      this.msm_error = '';
      $('#btn-verify-data').animate().hide();
      $('#btn-back-data').animate().show();

      $('#card-data-envio').animate().show();

      $('#card-pay').animate().show('fast');
      $('.cart-data-venta').animate().hide('fast');



      if(this.data_cupon){
        if(this.data_cupon.categoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.categoria.nombre;
        }else if(this.data_cupon.subcategoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.subcategoria;
        }
      }

      var fecha = new Date();

      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Deciembre"];
      fecha.setDate(fecha.getDate() + parseInt(this.medio_postal.dias));
      this.date_string =  fecha.getDate() +' de ' + months[fecha.getMonth()] + ' del ' + fecha.getFullYear();


      this.data_venta = {
        user : this.identity.uid,
        total_pagado : this.subtotal,
        codigo_cupon : this.cupon,
        info_cupon :  this.info_cupon_string,
        idtransaccion : null,
        metodo_pago : 'Paypal',

        tipo_envio: this.medio_postal.tipo_envio,
        precio_envio: this.medio_postal.precio,
        tiempo_estimado: this.date_string,

        direccion: this.data_direccion.direccion,
        destinatario: this.data_direccion.nombres_completos,
        referencia: this.data_direccion.referencia,
        pais: this.data_direccion.pais,
        ciudad: this.data_direccion.ciudad,
        zip: this.data_direccion.zip,
        detalles:this.data_detalle
      }

      console.log(this.data_venta);


    }else{
      this.msm_error = "Seleccione una dirección de envio.";
    }

  }

  back_data(){
    $('#btn-verify-data').animate().show();
    $('#btn-back-data').animate().hide();

    $('#card-data-envio').animate().hide();

    $('#card-pay').animate().hide('fast');
      $('.cart-data-venta').animate().show('fast');
  }
}
