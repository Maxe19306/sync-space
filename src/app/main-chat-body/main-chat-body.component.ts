import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatDialog } from '@angular/material/dialog';
import { timestamp } from 'rxjs';
import { SharedService } from '../shared.service';
import { User } from '../models/user.class';

@Component({
  selector: 'app-main-chat-body',
  templateUrl: './main-chat-body.component.html',
  styleUrls: ['./main-chat-body.component.scss']
})

export class MainChatBodyComponent implements OnInit {
  user:User
  mobileBreakpointGeneral: number;
  openSecondaryChat;
  @ViewChildren('messageElements') messageElements: QueryList<ElementRef>;
  @Input() channelName;
  date = '';
  currentUser;
  currentChannelMessage;

  constructor(
    public Dialog: MatDialog,
    public dataService: DataService,
    private firestore: AngularFirestore,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.loadCurrentUser()
  }

  getMobileBreakpointGeneral() {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--mobile-breakpoint-general').trim();
    this.mobileBreakpointGeneral = parseInt(value, 10);
  }

  ngAfterViewInit() {
    this.messageElements.changes.subscribe(() => {
      this.scrollMessageListToBottom();
    });
  }

  scrollMessageListToBottom(): void {
    try {
      this.messageElements.last.nativeElement.scrollIntoView({
        behavior: 'instant',
      });
    } catch (err) { };
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user;
        this.loadMessageFromChannel()
      })
  }

  loadMessageFromChannel() {
    this.firestore
      .collection('channels')
      .doc(this.currentUser.lastChannel)
      .collection('messages')
      .valueChanges({ idField: 'messageId' })
      .subscribe((channel) => {
        this.currentChannelMessage = channel;
        this.sortsMessages()
        this.updateLastDate()
        this.getCurrentInfoOfTheUsers()
      })
  }
  
  getCurrentInfoOfTheUsers() {}  
  
  
  
  sortsMessages() {
    this.currentChannelMessage.sort((a, b) => {
      return Number(a.timestamp) - Number(b.timestamp);
    });
  }

  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  formatDay(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  async openThread(messageId, channelId) {
    await this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        openThread: true,
        channelFromThread: channelId,
        threadId: messageId,
      })
    await this.sharedService.openSecondaryChat();
    if (window.innerWidth <= this.mobileBreakpointGeneral) {
      this.foregroundSecondaryChat();
    }
  }

  foregroundSecondaryChat() {
    this.hideMenuSidebarLeft();
    this.hideMainChat();
    this.changeLogoToBtn();
    this.foregroundSecondaryChatChangeAttributs();
  }

  hideMenuSidebarLeft() {
    const sidebarLeft = document.getElementsByTagName("app-menu-sidebar-left")[0] as HTMLElement;
    if (sidebarLeft) {
      sidebarLeft.style.display = 'none';
    }
    const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
    menuSidebarLeftFAB.style.display = "none";
  }

  hideMainChat() {
    const mainChat = document.getElementsByTagName("app-main-chat")[0] as HTMLElement;
    if (mainChat) {
      mainChat.style.display = "none";
    }
  }

  changeLogoToBtn() {
    const logoMobile = document.getElementById("logoMobile");
    logoMobile.style.display = "none";
    const channelsButtonMobile = document.getElementById("channelsButtonMobile");
    channelsButtonMobile.style.display = "block";
  }

  foregroundSecondaryChatChangeAttributs() {
    const secondaryChat = document.getElementsByTagName("app-secondary-chat")[0] as HTMLElement;
    if (secondaryChat) {
      secondaryChat.style.display = "block";
      secondaryChat.style.width = "100%";
      secondaryChat.style.marginLeft = 0 + "px";
      secondaryChat.style.backgroundColor = "white";
    }
  }

  lastDateDisplayed(timestamp) {
    // Date-Objekt aus dem Timestamp erstellen
    const date = new Date(timestamp);
    // Datum im Format "TT.MM.JJJJ" speichern
    const dateString = date.toLocaleDateString('de-DE');
    // Wenn das Datum mit dem zuletzt angezeigten Datum übereinstimmt, den Timestamp nicht anzeigen
    if (dateString === this.date) {
      return ''
    } else {
      // Andernfalls das Datum im Timestamp anzeigen und die Variable aktualisieren
      const newDate = dateString;
      this.date = newDate;
      return newDate;
    }
  }


  updateLastDate() {
    if (this.currentChannelMessage && this.currentChannelMessage.length > 0) {
      const lastMessage = this.currentChannelMessage[this.currentChannelMessage.length - 1]
      const date = new Date(lastMessage.timestamp)
      const dateString = date.toLocaleDateString('de-DE')
      this.date = dateString
    }
  }

}
