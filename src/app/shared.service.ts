import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toggleMenuSidebarLeftSource = new Subject<void>();
  toggleMenuSidebarLeft$ = this.toggleMenuSidebarLeftSource.asObservable();

  constructor() { }

  toggleMenuSidebarLeft() {
    this.toggleMenuSidebarLeftSource.next();
  }
}