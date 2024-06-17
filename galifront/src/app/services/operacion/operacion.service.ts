import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private API_SERVER = "http://localhost:8080/operaciones/";

  constructor(private httpClient: HttpClient) { }



  public getAllOperaciones(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveOperacion (operacion:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,operacion);
  }

  public deleteOperacion(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
