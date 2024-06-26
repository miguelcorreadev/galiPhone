import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductoComponent } from './producto/producto.component';
import { FTTHComponent } from './ftth/ftth.component';
import { CloudComponent } from './cloud/cloud.component'; 
import { MobileComponent } from './mobile/mobile.component'; 
import { InicioComponent } from './inicio/inicio.component'; 
import { OperadoraComponent } from './operadora/operadora.component';
import { OperacionComponent } from './operacion/operacion.component';
import { EstadoComponent } from './estado/estado.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
const routes: Routes = [
  { path: 'clientes', component: ClienteComponent }, 
  { path: 'productos', component: ProductoComponent },
  { path: 'ftth', component: FTTHComponent },
  { path: 'cloud', component: CloudComponent }, 
  { path: 'mobile', component: MobileComponent },
  { path: 'inicio', component: InicioComponent },  
  { path: 'operadora', component: OperadoraComponent }, 
  { path: 'operacion', component: OperacionComponent }, 
  { path: 'estado', component: EstadoComponent }, 
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: '', redirectTo: '../inicio', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  