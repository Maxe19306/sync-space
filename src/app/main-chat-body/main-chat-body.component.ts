import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-chat-body',
  templateUrl: './main-chat-body.component.html',
  styleUrls: ['./main-chat-body.component.scss']
})
export class MainChatBodyComponent implements OnInit {

  Date = '';
  currentUser;
  currentChannelMessage
  constructor(
    public Dialog: MatDialog,
    public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadCurrentUser()
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
      .valueChanges({ idField: 'messageID' })
      .subscribe((channel) => {
        this.currentChannelMessage = channel;
        console.log(this.currentChannelMessage)
        this.sortsMessages()

      })
  }

  sortsMessages() {
    this.currentChannelMessage.sort((a, b) => {
      return Number(a.timestamp) - Number(b.timestamp);
    });
  }

  openDialogProfil(userID) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userID }
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


  openThread(Messageid, Channelid) {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        openThread: true,
        ChannelFromThread: Channelid,
        ThreadID: Messageid,
      })
  }

  lastDateDisplayed(timestamp) {
    // Date-Objekt aus dem Timestamp erstellen
    const date = new Date(timestamp);
    // Datum im Format "TT.MM.JJJJ" speichern
    const dateString = date.toLocaleDateString('de-DE');
    // Wenn das Datum mit dem zuletzt angezeigten Datum übereinstimmt, den Timestamp nicht anzeigen
    if (dateString === this.Date) {
      return ''
    } else {
      // Andernfalls das Datum im Timestamp anzeigen und die Variable aktualisieren
      const newDate = dateString;
      this.Date = newDate;
      return newDate;
    }
  }

}
