import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatDialog } from '@angular/material/dialog';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-secondary-chat-body',
  templateUrl: './secondary-chat-body.component.html',
  styleUrls: ['./secondary-chat-body.component.scss']
})

export class SecondaryChatBodyComponent implements OnInit {
  
  @ViewChildren('messageElements') messageElements: QueryList<ElementRef>;

  date = '';
  currentUser;
  currentChannelMessage;
  currentThreadAnswer;

  constructor(
    public Dialog: MatDialog,
    public dataService: DataService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
  }

  ngAfterViewInit() {
    this.messageElements.changes.subscribe(() => {
    ;
    this.scrollMessageListToBottom() });
  }

  scrollMessageListToBottom(): void {
    setTimeout(() => {
      try {
        this.messageElements.last.nativeElement.scrollIntoView({
          behavior: 'instant',
        });
      } catch (err) { };
    }
    )}
   

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
      .doc(this.currentUser.ChannelFromThread)
      .collection('messages')
      .doc(this.currentUser.ThreadId)
      .valueChanges({ idField: 'messageID' })
      .subscribe((channel) => {
        this.currentChannelMessage = channel;
        this.loadThreadAnswer()

      })
  }

  loadThreadAnswer() {
    this.firestore
      .collection('channels')
      .doc(this.currentUser.ChannelFromThread)
      .collection('messages')
      .doc(this.currentUser.ThreadId)
      .collection('threadAnswer')
      .valueChanges({ idField: 'messageID' })
      .subscribe((channel) => {
        this.currentThreadAnswer = channel;
        this.sortsMessages();
        this.scrollMessageListToBottom();
      })
  }

  sortsMessages() {
    this.currentThreadAnswer.sort((a, b) => {
      return Number(a.timestamp) - Number(b.timestamp);
    });
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

  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId }
    })
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


}
