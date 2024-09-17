import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseURL = 'http://localhost:8080/api/v1/attendance';
  private signOutUrl='http://localhost:8080/api/v1/signOut'

  constructor(private httpclient: HttpClient) {}

  createAttendance(attendance: Attendance): Observable<Attendance> {
    return this.httpclient.post<Attendance>(this.baseURL, attendance);
  }

  updateAttendance(attendance: Attendance): Observable<Attendance> {
    return this.httpclient.put<Attendance>(`${this.signOutUrl}`, attendance);
  }
}
