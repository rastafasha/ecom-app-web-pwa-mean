import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';
import { Observable } from "rxjs";
import { Categoria, CatProducModel } from '../models/categoria.model';


const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  serverUrl = environment.baseUrl;


  public producto: Producto;
  public categoria: CatProducModel;

  constructor(
    private http: HttpClient
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  getProductos() {
    const url = `${base_url}/productos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      )
  }

  getProductoById(_id: string){
    const url = `${base_url}/productos/${_id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      );

  }

  listar_newest():Observable<any>{
    const url = `${base_url}/productos/productos_nuevos/show_producto`;
    return this.http.get(url,  this.headers);
  }

  findProducto_by_Categorynombre(nombre):Observable<any>{
    const url = `${base_url}/productos/producto_by_categorynombre/nombre/${nombre}`;
    return this.http.get<any>(url)
  }


  // cat_by_name(name):Observable<any>{
  //   const url = `${base_url}/productos/categoria/name/`+name;
  //   return this.http.get(url, this.headers)
  //   .pipe(
  //     map((resp:{ok: boolean, producto: Producto}) => resp.producto)
  //     );
  // }
/**
   * @method: Método que obtiene producto por categoria
   * @author: malcolmc
   * @since 21/06/2022
   * @param _id {_id}: objeto a obtener
   */

  listar_productoCat(_id: any): Observable<Producto>{
    const url = `${base_url}/productos/productos_general/cat/${_id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, productos: Producto}) => resp.productos)
      );

  }

  find_by_slug(slug):Observable<any>{
    const url = `${base_url}/productos/producto_by_slug/slug/${slug}`;
    return this.http.get<any>(url)
    .pipe(
      map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      );
  }

  reducir_stock(id,cantidad):Observable<any>{

    const url = `${base_url}/productos/productos_stock/reducir/${id}/${cantidad}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto_data: Producto}) => resp.producto_data)
      );
  }

  aumentar_stock(id,cantidad):Observable<any>{

    const url = `${base_url}/productos/productos_stock/aumentar/${id}/${cantidad}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto_data: Producto}) => resp.producto_data)
      );
  }

  aumentar_ventas(id):Observable<any>{

    const url = `${base_url}/productos/productos_ventas/aumentar/${id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, producto_data: Producto}) => resp.producto_data)
      );
  }

  listar_autocomplete():Observable<any>{
    const url = `${base_url}/productos/producto_cliente_autocomplete`;
    return this.http.get(url,  this.headers);
  }









}
