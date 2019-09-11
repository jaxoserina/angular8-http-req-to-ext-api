import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_ENDPOINT = 'https://itg-prd-recruit.appspot.com/api/';

  constructor(private httpClient: HttpClient) { }

  public get(path): Observable<any | any[]> {
    return this.httpClient.get(`${this.API_ENDPOINT}${path}`);
  }

}
