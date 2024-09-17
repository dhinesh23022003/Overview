import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalService } from '../modal.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AttendanceService } from '../attendance.service'; 
import { Attendance } from '../attendance'; 

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('attendanceModal') attendanceModal!: TemplateRef<any>;

  attendanceForm!: FormGroup;
  attendanceData: Attendance = new Attendance();
  signInDate: string | null = null;
  signInTime: string | null = null;
  signOutDate: string | null = null;
  signOutTime: string | null = null;

  constructor(
    private dialog: MatDialog,
    private modalService: ModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private ats: AttendanceService 
  ) {}

  ngOnInit(): void {
    this.initializeForms();

    this.modalService.openModal$.subscribe(() => {
      const dialogConfig = new MatDialogConfig();
  
      // Set default dialog size
      dialogConfig.width = '45%'; // Default width for medium screens
      dialogConfig.maxWidth = '90%'; // Maximum width
      dialogConfig.height = 'auto'; // Default height
      dialogConfig.maxHeight = '90vh'; // Maximum height relative to viewport height
  
      this.dialog.open(this.attendanceModal, dialogConfig);
    });
  
    this.resetButtonState();
  }

  initializeForms() {
    this.attendanceForm = this.fb.group({
      signIn: [null], 
      signOut: [{ value: null, disabled: true }] 
    });
  }

  toggleButtonState(controlName: string) {
    if (controlName === 'signIn') {
      this.attendanceSignIn(); 
      this.attendanceForm.get('signIn')?.disable();
      this.attendanceForm.get('signOut')?.enable();
    } else if (controlName === 'signOut') {
      this.attendanceSignOut(); 
      this.attendanceForm.get('signOut')?.disable();
      this.attendanceForm.get('signIn')?.enable();
    }
  }

  resetButtonState() {
    this.attendanceForm.get('signIn')?.enable();
    this.attendanceForm.get('signOut')?.disable();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  attendanceSignIn() {
    const currentDateTime = new Date();
    this.signInDate = this.formatDate(currentDateTime);
    this.signInTime = currentDateTime.toLocaleTimeString();
    this.attendanceData.date = this.signInDate;
    this.attendanceData.signIn = this.signInTime;
    console.log(`Signed in at: ${this.signInDate} ${this.signInTime}`);

    this.ats.createAttendance(this.attendanceData).subscribe(data => {
      console.log('Attendance created:', data);
    });
  }

  attendanceSignOut() {
    const currentDateTime = new Date();
    this.signOutDate = this.formatDate(currentDateTime);
    this.signOutTime = currentDateTime.toLocaleTimeString();
    
    this.attendanceData.signOut = this.signOutTime;
    console.log(`Signed out at: ${this.signOutDate} ${this.signOutTime}`);

    this.ats.updateAttendance(this.attendanceData).subscribe(data => {
      console.log('Attendance updated:', data);
    });
  }
}
