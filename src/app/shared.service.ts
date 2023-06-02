import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toggleMenuSidebarLeftSource = new Subject<void>();
  private slideSecondaryChatSource = new Subject<void>();
  toggleMenuSidebarLeft$ = this.toggleMenuSidebarLeftSource.asObservable();
  slideSecondaryChat$ = this.slideSecondaryChatSource.asObservable();

  constructor() { }

  toggleMenuSidebarLeft() {
    this.toggleMenuSidebarLeftSource.next();
  }

  slideSecondaryChat() {
    this.slideSecondaryChatSource.next();
  }
}