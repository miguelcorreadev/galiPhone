import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private API_SERVER = "http://localhost:8080/estados/";

  constructor(private httpClient: HttpClient) { }



  public getAllEstados(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEstado (estado:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,estado);
  }

  public deleteEstado(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
