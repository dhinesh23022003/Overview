import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from '../calendar.service';
import { Attendance } from '../attendance';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('dateModal') dateModal!: TemplateRef<any>;
  @ViewChild('calendar') calendarEl!: ElementRef;
  
  dateString: string = "";
  signIn:string="";
  signOut:string="";
  dateId: Date | null = null;
  selectedDate: Date | null = null;
  calendar: Calendar | undefined;
  attendanceData: Attendance = new Attendance();

  constructor(private modalService: NgbModal,private http:HttpClient, private cas:CalendarService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: (info: any) => this.handleDateClick(info),
    });
    this.calendar.render();
  }

  handleDateClick(info: any): void {
    this.selectedDate = info.date;
  
    if (this.selectedDate) {
      // Format the dateId as a string in the yyyy-mm-dd format
      const year = this.selectedDate.getFullYear();
      const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(this.selectedDate.getDate()).padStart(2, '0');
  
      this.dateString = `${year}-${month}-${day}`;
      this.attendanceData.date=this.dateString;
    }
    this.cas.updateCalendar(this.attendanceData).subscribe(data => {
      this.signIn=data.signIn;
      this.signOut=data.signOut;     
    });
  
    this.modalService.open(this.dateModal);
    this.signIn="";
    this.signOut="";
  }
  

}

