import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FTTHService {
  private API_SERVER = "http://localhost:8081/ftth/";

  constructor(private httpClient: HttpClient) { }



  public getAllFTTH(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveFTTH (ftth:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,ftth);
  }

  public deleteFTTH(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
