import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFeaturedComponent } from './blog-featured/blog-featured.component';
import { PageFeaturedComponent } from './page-featured/page-featured.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';


//pluggins
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    BlogFeaturedComponent,
    PageFeaturedComponent,
    ProductsFeaturedComponent,
    CartComponent,
    CartItemComponent,
  ],
  exports: [
    BlogFeaturedComponent,
    PageFeaturedComponent,
    ProductsFeaturedComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPayPalModule,
    NgbModule,
    PipesModule
  ]
})
export class ComponentsModule { }
