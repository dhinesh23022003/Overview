import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModalSubject = new Subject<void>();
  openModal$ = this.openModalSubject.asObservable();

  triggerOpenModal() {
    this.openModalSubject.next();
  }
}
