import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL="http://localhost:8080/api/v1/employees";
  private deleteURL="http://localhost:8080/api/v1/employees/deleted";
  constructor(private httpclient:HttpClient) { }

  getEmployeeList(): Observable<Employee[]>{
    return this.httpclient.get<Employee[]>(`${this.baseURL}`);
  }
  createEmployee(employee:Employee):Observable<object>{
    return this.httpclient.post(`${this.baseURL}`,employee);
  
  }
  updateEmployee(employee:Employee):Observable<object>{
    return this.httpclient.put(`${this.baseURL}`,employee);
  }
  deteleEmployee(employee:Employee):Observable<object>{
    return this.httpclient.put(`${this.deleteURL}`,employee);
  }

   
}
