import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {
  private API_SERVER = "http://localhost:8080/operadoras/";

  constructor(private httpClient: HttpClient) { }



  public getAllOperadoras(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveOperadora (operadora:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,operadora);
  }

  public deleteOperadora(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
