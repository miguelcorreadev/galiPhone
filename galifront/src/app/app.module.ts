import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FTTHComponent } from './ftth/ftth.component';
import { CloudComponent } from './cloud/cloud.component';
import { MobileComponent } from './mobile/mobile.component';
import { InicioComponent } from './inicio/inicio.component';
import { OperadoraComponent } from './operadora/operadora.component';
import { OperacionComponent } from './operacion/operacion.component';
import { EstadoComponent } from './estado/estado.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,  // Agregar ClienteComponent aquí
    ProductoComponent, // Agregar ProductoComponent aquí
    FTTHComponent,
    CloudComponent,
    MobileComponent,
    InicioComponent,
    OperadoraComponent,
    OperacionComponent,
    PageNotFoundComponent,
    EstadoComponent,
    ListarProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatToolbarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
