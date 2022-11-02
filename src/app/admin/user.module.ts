import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsideCuentaComponent } from './aside-cuenta/aside-cuenta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DireccionEditComponent } from './direccion-edit/direccion-edit.component';
import { IndexOrdenesComponent } from './ordenes/index-ordenes/index-ordenes.component';
import { DetalleOrdenComponent } from './ordenes/detalle-orden/detalle-orden.component';
import { IndexTicketComponent } from './ordenes/index-ticket/index-ticket.component';
// import { ChatTicketComponent } from './ordenes/chat-ticket/chat-ticket.component';



@NgModule({
  declarations: [
    AsideCuentaComponent,
    PerfilComponent,
    DireccionesComponent,
    DireccionEditComponent,
    IndexOrdenesComponent,
    DetalleOrdenComponent,
    IndexTicketComponent,
    // ChatTicketComponent

  ],
  exports: [
    AsideCuentaComponent,
    PerfilComponent,
    DireccionesComponent,
    DireccionEditComponent,
    IndexOrdenesComponent,
    DetalleOrdenComponent,
    IndexTicketComponent,
    // ChatTicketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    ComponentsModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
