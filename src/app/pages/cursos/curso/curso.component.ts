import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { CursoService } from 'src/app/services/curso.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria.model';
import { Curso } from 'src/app/models/curso.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { CarritoService } from 'src/app/services/carrito.service';
import { ComentarioCursoService } from 'src/app/services/comentariocurso.service';
import { VentaService } from 'src/app/services/venta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from "socket.io-client";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  // curso: any = [];
  curso: Curso;
  categories: Categoria[];

  _id:string;
  public url;
  public socket = io(environment.soketServer);
  public cantidad_to_cart = 1;
  public precio_to_cart;
  public color_to_cart = '#16537e';
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;
  public identity;

  public news_cursos : any = {};
  public data_cupon;

  public msm_error_review='';

  public get_state_user_producto_coment = false;

  public comentarios :any=[];

  /*COMENTARIOS DATA */
  public cinco_estrellas = 0;
  public cuatro_estrellas = 0;
  public tres_estrellas = 0;
  public dos_estrellas = 0;
  public una_estrella = 0;

  public cinco_porcent = 0;
  public cuatro_porcent = 0;
  public tres_porcent = 0;
  public dos_porcent = 0;
  public uno_porcent = 0;
  public raiting_porcent = 0;
  public total_puntos = 0;
  public max_puntos = 0;
  public raiting_puntos= 0;

  /*PAGINATE COMENTS */
  public page;
  public pageSize = 5;
  public count_cat;
  public sort_data_coment = 'raiting';

  /*FORM RESEÑA */
  public id_review_producto;
  public review_comentario='';
  public review_pros='';
  public review_cons='';
  public review_estrellas='';

  constructor(
    public cursoService: CursoService,
    public categoryService: CategoryService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private _ventaService: VentaService,
    private _carritoService: CarritoService,
    private _comentarioCursoService: ComentarioCursoService,

  ) {
    this.url = environment.baseUrl;
    this.identity = usuarioService.usuario;
   }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerCurso(id));
    this.activatedRoute.params.subscribe( ({id}) => this.init_data(id));
    this.obtenerCategorias();

    this.socket.on('new-stock', function (data) {
      this.init_data();

    }.bind(this));

    this.listar_newest();

    if(!this.identity){
      this.router.navigateByUrl('/login');
    }
  }

  obtenerCurso(_id:string){
    this.cursoService.getCurso(_id).subscribe(
      resp=>{
        this.curso = resp;
        console.log(this.curso);
      }
    )
  }

  init_data(_id:string){
    this.cursoService.getCurso(_id).subscribe(
      response =>{
        this.curso = response;


        if(this.identity){
          this._ventaService.evaluar_venta_user(this.identity.uid,this.curso._id).subscribe(
            response =>{
              this.get_state_user_producto_coment = response.data;
            },
            error=>{

            }
          );
        }

        this.data_comentarios();

        $('#detalle').html(this.curso.detalle);
        // $('#video_iframe').append(this.producto.video_review);
        // $('iframe').removeAttr('height');
        // $('iframe').attr('height','400px');


        this.precio_to_cart = this.curso.precio_ahora;


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

  listar_newest(){
    this.cursoService.listar_newest().subscribe(
      response =>{
        this.news_cursos = response.data;
      },
      error=>{

      }
    );
  }

  data_comentarios(){
    this._comentarioCursoService.get_data(this.curso._id,"raiting").subscribe(
      response =>{

        this.comentarios = response.comentarios;
        console.log(this.comentarios);


        this.count_cat = this.comentarios.length;
        this.page = 1;

        this.comentarios.forEach(element => {
          this._comentarioCursoService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );

          this._comentarioCursoService.get_dislikes(element._id).subscribe(
              response =>{
                element.dislikes = response.data.length;
              },
              error=>{

              }
            );
          });
        console.log(this.comentarios);


        this.comentarios.forEach((element,index) => {
          if(element.estrellas == 5){
            this.cinco_estrellas = this.cinco_estrellas + 1;
          }
          else if(element.estrellas == 4){
            this.cuatro_estrellas = this.cuatro_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.tres_estrellas = this.tres_estrellas + 1;
          }
          else if(element.estrellas == 2){
            this.dos_estrellas = this.dos_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.una_estrella = this.una_estrella + 1;
          }
        });

        this.cinco_porcent = (this.cinco_estrellas*100)/this.comentarios.length;
        this.cuatro_porcent = (this.cuatro_estrellas*100)/this.comentarios.length;
        this.tres_porcent = (this.tres_estrellas*100)/this.comentarios.length;
        this.dos_porcent = (this.dos_estrellas*100)/this.comentarios.length;
        this.uno_porcent = (this.una_estrella*100)/this.comentarios.length;

        /******************************************************************* */

        let puntos_cinco = 0;
        let puntos_cuatro = 0;
        let puntos_tres = 0;
        let puntos_dos = 0;
        let punto_uno = 0;

        puntos_cinco = this.cinco_estrellas * 5;
        puntos_cuatro = this.cuatro_estrellas * 4;
        puntos_tres = this.tres_estrellas * 3;
        puntos_dos = this.dos_estrellas * 2;
        punto_uno = this.una_estrella * 1;

        this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + punto_uno;
        this.max_puntos = this.comentarios.length * 5;

        this.raiting_porcent =(this.total_puntos*100)/this.max_puntos;

        this.raiting_puntos =(this.raiting_porcent*5)/100;

        if(isNaN(this.raiting_puntos)){
          this.raiting_puntos = 0;
        }
        if(isNaN(this.raiting_porcent)){
          this.raiting_porcent = 0;
        }

      },
      error=>{
        console.log(error);

      }
    );
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


add_to_cart(carritoForm){


    let data = {
      user: this.identity.uid,
      curso : this.curso._id,
      cantidad: 1,
      precio : this.precio_to_cart
    }
    this._carritoService.registro(data).subscribe(
      response =>{
        this.socket.emit('save-carrito', {new:true});
        $('#dark-toast').removeClass('hide');
        $('#dark-toast').addClass('show');
        setTimeout(function() {
            $("#dark-toast").fadeOut(1500);
        },3000);
      },
      error=>{

      }
    );


}


add_likes(idcoment){

  let data = {
    comentario : idcoment,
    user : this.identity.uid
  }

  this._comentarioCursoService.add_likes(data).subscribe(
    response =>{
      this.comentarios.forEach(element => {
        this._comentarioCursoService.get_likes(element._id).subscribe(
          response =>{
            element.likes = response.data.length;
          },
          error=>{

          }
        );
      });

    },
    error=>{
      console.log(error);

    }
  );
}

add_dislikes(idcoment){

  let data = {
    comentario : idcoment,
    user : this.identity.uid
  }

  this._comentarioCursoService.add_dislikes(data).subscribe(
    response =>{
      this.comentarios.forEach(element => {
        this._comentarioCursoService.get_dislikes(element._id).subscribe(
          response =>{
            element.dislikes = response.data.length;
          },
          error=>{

          }
        );
      });

    },
    error=>{
      console.log(error);

    }
  );
}

saveComent(reviewForm){
  if(reviewForm.valid){

    let data = {
      comentario: reviewForm.value.review_comentario,
      pros: reviewForm.value.review_pros,
      cons: reviewForm.value.review_cons,
      estrellas: reviewForm.value.review_estrellas,
      user: this.identity.uid,
      curso: this.curso._id,
    }
    this._comentarioCursoService.registro(data).subscribe(
      response =>{
        this.msm_error_review = '';
        this.id_review_producto='';
        this.review_comentario='';
        this.review_pros='';
        this.review_cons='';
        this.review_estrellas='';
      },
      error=>{
        this.msm_error_review = error.error.message;
        this.id_review_producto='';
        this.review_comentario='';
        this.review_pros='';
        this.review_cons='';
        this.review_estrellas='';
      }
    );

  }else{
    this.msm_error_review = 'Complete correctamente los campos.';
  }
}

close_alert(){
  this.msm_error_review = '';

}

close_toast(){
  $('#dark-toast').removeClass('show');
      $('#dark-toast').addClass('hide');
}


}
