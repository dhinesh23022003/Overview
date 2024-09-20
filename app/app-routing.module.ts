import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { MultiheaderTableComponent } from "./multiheader-table/multiheader-table.component";

const routes: Routes = [
  { path: "employees", component: EmployeeListComponent },
  {
    path: "attendance",
    component: AttendanceComponent,
  },
  {
    path: "Calendar",
    component: CalendarComponent
  },
  { path: "dynamicform", component: DynamicFormComponent },
  { path: "dynamictable", component: DynamicTableComponent },
  { path: "multiheadertable", component: MultiheaderTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
