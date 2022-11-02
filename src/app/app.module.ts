import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { PipesModule } from './pipes/pipes.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './admin/user.module';


import { NgxPayPalModule } from 'ngx-paypal';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = {url: environment.soketServer, options:{}};

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AuthModule,
    SharedModule,
    PipesModule,
    UserModule,
    NgxPayPalModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
