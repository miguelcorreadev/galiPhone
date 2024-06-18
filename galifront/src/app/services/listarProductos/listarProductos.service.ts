import { Injectable } from '@angular/core';
import { Observable, forkJoin  } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListarProductosService {
  private API_SERVER = "http://localhost:8080/clientes/";
  private API_SERVER_FTTH = "http://localhost:8082/ftth/";
  private API_SERVER_CLOUD = "http://localhost:8083/cloud/";
  private API_SERVER_MOBILE = "http://localhost:8084/mobile/";

  constructor(private httpClient: HttpClient) { }


  
  getAllProducts(email: string): Observable<any[]> {
    const mobile$ = this.httpClient.get(`${this.API_SERVER_MOBILE}?email=${email}`);
    const ftth$ = this.httpClient.get(`${this.API_SERVER_FTTH}?email=${email}`);
    const cloud$ = this.httpClient.get(`${this.API_SERVER_CLOUD}?email=${email}`);

    return forkJoin([mobile$, ftth$, cloud$]);
  }


}
