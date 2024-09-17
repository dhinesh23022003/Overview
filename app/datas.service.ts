import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datas } from './Datas';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  private baseURL="http://localhost:8080/api/v1/allData";
  constructor(private httpclient:HttpClient) { }

  getDataList(): Observable<Datas[]>{
    return this.httpclient.get<Datas[]>(`${this.baseURL}`);
  }

   
}