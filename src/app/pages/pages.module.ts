import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';


import { PagesComponent } from './pages.component';

//modules
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//pluggins

import { NgxPaginationModule } from 'ngx-pagination';

import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { CursosComponent } from './cursos/cursos/cursos.component';
import { CursoComponent } from './cursos/curso/curso.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AboutComponent } from './nosotros/about/about.component';
import { FaqComponent } from './legal/faq/faq.component';
import { PrivacypolicyComponent } from './legal/privacypolicy/privacypolicy.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AboutIndexComponent } from './nosotros/about-index/about-index.component';
import { UserModule } from '../admin/user.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    BlogDetailComponent,
    BlogListComponent,
    CursosComponent,
    CursoComponent,
    ProductoComponent,
    ProductosComponent,
    ContactComponent,
    HomeComponent,
    MyaccountComponent,
    AboutComponent,
    AboutIndexComponent,
    FaqComponent,
    PrivacypolicyComponent,
    CarritoComponent,
    PagesComponent,
    CategoriasComponent,
    SearchComponent

  ],
  exports: [
    BlogDetailComponent,
    BlogListComponent,
    CursosComponent,
    CursoComponent,
    ProductoComponent,
    ProductosComponent,
    ContactComponent,
    HomeComponent,
    MyaccountComponent,
    AboutComponent,
    AboutIndexComponent,
    FaqComponent,
    PrivacypolicyComponent,
    CarritoComponent,
    CategoriasComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule,
    SharedModule,
    UserModule
  ],
  providers:[],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PagesModule { }
