import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule,HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttendanceComponent } from './attendance/attendance.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarComponent } from './calendar/calendar.component'; 
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicTableTemplateComponent } from './dynamic-table-template/dynamic-table-template.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AttendanceComponent,
    CalendarComponent,
    DynamicFormBuilderComponent,
    DynamicFormComponent,
    DynamicTableTemplateComponent,
    DynamicTableComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())  // Configure HttpClient to use fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
