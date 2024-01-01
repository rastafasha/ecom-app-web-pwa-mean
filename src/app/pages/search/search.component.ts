import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/product.service';

import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public productos: Producto[]=[];
  public cursos: Curso[]=[];

  constructor(
    public productoService: ProductoService,
    private busquedasService: BusquedasService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      ({termino}) => {
        this.busquedaGlobal(termino);
      }
    )
  }

  busquedaGlobal(termino: string){
    this.busquedasService.searchGlobal(termino).subscribe(
      (resp:any) => {
        this.productos = resp.productos;
        this.cursos = resp.cursos;
      }
    )
  }

}
