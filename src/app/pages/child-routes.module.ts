import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DireccionEditComponent } from '../admin/direccion-edit/direccion-edit.component';
import { DireccionesComponent } from '../admin/direcciones/direcciones.component';
import { ChatTicketComponent } from '../admin/ordenes/chat-ticket/chat-ticket.component';
import { DetalleOrdenComponent } from '../admin/ordenes/detalle-orden/detalle-orden.component';
import { IndexOrdenesComponent } from '../admin/ordenes/index-ordenes/index-ordenes.component';
import { PerfilComponent } from '../admin/perfil/perfil.component';

import { AdminGuard } from '../guards/admin.guard';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ContactComponent } from './contact/contact.component';
import { CursoComponent } from './cursos/curso/curso.component';
import { CursosComponent } from './cursos/cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './legal/faq/faq.component';
import { PrivacypolicyComponent } from './legal/privacypolicy/privacypolicy.component';

import { MyaccountComponent } from './myaccount/myaccount.component';
import { AboutIndexComponent } from './nosotros/about-index/about-index.component';
import { AboutComponent } from './nosotros/about/about.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { ProductosComponent } from './productos/productos/productos.component';



const childRoutes: Routes = [

  // { path: '', component: MyaccountComponent, data:{tituloPage:'Dashboard'} },

  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'curso/:id', component: CursoComponent},
  { path: 'productos', component: ProductosComponent},
  // { path: 'producto/:slug', component: ProductoComponent},
  { path: 'producto/:id', component: ProductoComponent},
  { path: 'blogs', component: BlogListComponent},
  { path: 'blog/:id', component: BlogDetailComponent},
  { path: 'about', component: AboutIndexComponent},
  { path: 'about/:id', component: AboutComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'cart', component: CarritoComponent},
  { path: 'privacy-policy', component: PrivacypolicyComponent},
  { path: 'contact', component: ContactComponent},
  // { path: 'category/:id', component: CategoriasComponent},
  { path: 'category/:nombre', component: CategoriasComponent},

    { path: 'my-account', component: MyaccountComponent},
    { path: 'cuenta/perfil', component: PerfilComponent},
    { path: 'cuenta/direcciones', component: DireccionesComponent},
    { path: 'cuenta/direccion/create', component: DireccionEditComponent},
    { path: 'cuenta/direccion/edit/:id', component: DireccionEditComponent},
    { path: 'cuenta/ordenes', component: IndexOrdenesComponent},
    { path: 'cuenta/ordenes/detalles/:id', component: DetalleOrdenComponent},
    { path: 'cuenta/ordenes/tickets/:id', component: ChatTicketComponent},



]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
