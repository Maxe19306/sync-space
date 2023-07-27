import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatDialog } from '@angular/material/dialog';
import { timestamp } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main-chat-body',
  templateUrl: './main-chat-body.component.html',
  styleUrls: ['./main-chat-body.component.scss']
})

export class MainChatBodyComponent implements OnInit {

  openSecondaryChat;

  @ViewChildren('messageElements') messageElements: QueryList<ElementRef>;

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
    this.loadCurrentUser()
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

      })
  }

  sortsMessages() {
    this.currentChannelMessage.sort((a, b) => {
      return Number(a.timestamp) - Number(b.timestamp);
    });
  }

  openDialogProfil(userID) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userID },
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
