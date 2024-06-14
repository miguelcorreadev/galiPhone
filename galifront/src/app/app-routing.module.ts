import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductoComponent } from './producto/producto.component';
const routes: Routes = [
  { path: 'clientes', component: ClienteComponent }, 
  { path: 'productos', component: ProductoComponent },
  { path: '', redirectTo: '../clientes', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  