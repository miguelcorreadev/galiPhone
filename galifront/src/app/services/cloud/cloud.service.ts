import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private API_SERVER = "http://localhost:8083/cloud/";

  constructor(private httpClient: HttpClient) { }


  public getAllCloud(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveCloud (cloud:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,cloud);
  }

  public deleteCloud(id):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

}
