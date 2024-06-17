import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  private API_SERVER = "http://localhost:8084/mobile/";

  constructor(private httpClient: HttpClient) { }



  public getAllMobile(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveMobile (ftth:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,ftth);
  }

  public deleteMobile(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}