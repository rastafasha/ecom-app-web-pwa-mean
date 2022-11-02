import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlidertopComponent } from './slidertop/slidertop.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SlidertopComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SlidertopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
  ]
})
export class SharedModule { }
