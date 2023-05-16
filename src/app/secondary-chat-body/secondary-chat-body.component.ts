import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-secondary-chat-body',
  templateUrl: './secondary-chat-body.component.html',
  styleUrls: ['./secondary-chat-body.component.scss']
})
export class SecondaryChatBodyComponent implements OnInit {
  Date;
  currentUser;
  currentChannelMessage;
  currentThreadAnswer;
  constructor(
    public Dialog: MatDialog,
    public dataService : DataService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
  }


  loadCurrentUser(){
    this.firestore
     .collection('users')
     .doc(this.dataService.id)
     .valueChanges({idField: 'id'})
     .subscribe((user) =>{
      this.currentUser = user;
      this.loadMessageFromChannel()
     })
  }

  loadMessageFromChannel(){
    this.firestore
     .collection('channels')
     .doc(this.currentUser.ChannelFromThread)
     .collection('messages')
     .doc(this.currentUser.ThreadID)
     .valueChanges({idField: 'messageID'})
     .subscribe((channel) =>{
      this.currentChannelMessage = channel;
      this.loadThreadAnswer()

     })
  }

  loadThreadAnswer(){
    this.firestore
     .collection('channels')
     .doc(this.currentUser.ChannelFromThread)
     .collection('messages')
     .doc(this.currentUser.ThreadID)
     .collection('threadAnswer')
     .valueChanges({idField: 'messageID'})
     .subscribe((channel) =>{
      this.currentThreadAnswer = channel;

      this.sortsMessages()
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

  openDialogProfil(userID){
    this.Dialog.open(ProfileViewComponent, {
      data: {userID}
    })
}
lastDateDisplayed(timestamp){
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
