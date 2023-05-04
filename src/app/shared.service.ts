import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private triggerActionSource = new Subject<void>();
  triggerAction$ = this.triggerActionSource.asObservable();

  constructor() { }

  triggerAction() {
    this.triggerActionSource.next();
  }
}