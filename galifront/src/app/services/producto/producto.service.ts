import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_SERVER = "http://localhost:8081/productos/";

  constructor(private httpClient: HttpClient) { }



  public getAllProductos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveProducto (producto:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,producto);
  }

  public deleteProducto(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
