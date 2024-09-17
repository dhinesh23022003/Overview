import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseURL = 'http://localhost:8080/api/v1/calendar';
  constructor(private httpclient: HttpClient) {}

  updateCalendar(attendance: Attendance): Observable<Attendance> {
    return this.httpclient.put<Attendance>(`${this.baseURL}`, attendance);
  }
}
