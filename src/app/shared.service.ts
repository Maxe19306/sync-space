import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private toggleMenuSidebarLeftSource = new Subject<void>();
  private openSecondaryChatSource = new Subject<void>();
  private slideSecondaryChatSource = new Subject<void>();
  public closeSheetSubject = new Subject<void>();
  toggleMenuSidebarLeft$ = this.toggleMenuSidebarLeftSource.asObservable();
  openSecondaryChat$ = this.openSecondaryChatSource.asObservable();
  slideSecondaryChat$ = this.slideSecondaryChatSource.asObservable();
  closeSheet$ = this.closeSheetSubject.asObservable();

  constructor() { }

  toggleMenuSidebarLeft() {
    this.toggleMenuSidebarLeftSource.next();
  }

  openSecondaryChat() {
    this.openSecondaryChatSource.next();
  }

  slideSecondaryChat() {
    this.slideSecondaryChatSource.next();
  }

  closeSheet() {
    this.closeSheetSubject.next();
  }
}

export class ChatService {
  focusOnTextareaEvent = new EventEmitter<void>();
}