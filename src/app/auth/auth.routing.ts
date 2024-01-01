import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';

//pages

import { BlogDetailComponent } from '../pages/blog/blog-detail/blog-detail.component';
import { BlogListComponent } from '../pages/blog/blog-list/blog-list.component';
import { CarritoComponent } from '../pages/carrito/carrito.component';
import { CategoriasComponent } from '../pages/categorias/categorias.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { CursoComponent } from '../pages/cursos/curso/curso.component';
import { CursosComponent } from '../pages/cursos/cursos/cursos.component';
import { HomeComponent } from '../pages/home/home.component';
import { FaqComponent } from '../pages/legal/faq/faq.component';
import { PrivacypolicyComponent } from '../pages/legal/privacypolicy/privacypolicy.component';
import { AboutIndexComponent } from '../pages/nosotros/about-index/about-index.component';
import { AboutComponent } from '../pages/nosotros/about/about.component';
import { ProductoComponent } from '../pages/productos/producto/producto.component';
import { ProductosComponent } from '../pages/productos/productos/productos.component';
import { SearchComponent } from '../pages/search/search.component';

const routes: Routes = [


  //auth
    { path: 'registro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recovery-password', component: RecoveryComponent },

    { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'curso/:id', component: CursoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'producto/:slug', component: ProductoComponent},
  // { path: 'producto/:id', component: ProductoComponent},
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
  { path: 'search/:termino', component: SearchComponent},
];




@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
