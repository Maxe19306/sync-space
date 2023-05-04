import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private hideMenuSidebarLeftSource = new Subject<void>();
  hideMenuSidebarLeft$ = this.hideMenuSidebarLeftSource.asObservable();

  constructor() { }

  hideMenuSidebarLeft() {
    this.hideMenuSidebarLeftSource.next();
  }
}