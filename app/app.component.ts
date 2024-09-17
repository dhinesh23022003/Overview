import { ModalService } from './modal.service';
import { Router } from '@angular/router';

import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'projectApi';

  constructor(private modalService: ModalService, private router: Router) {}

  openAttendanceModal() {
    this.router.navigate(['/attendance']).then(() => {
      this.modalService.triggerOpenModal();
    });
  }


 
}
