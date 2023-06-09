import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, ref,  } from "firebase/storage";


@Component({
  selector: 'app-main-direct-message-body',
  templateUrl: './main-direct-message-body.component.html',
  styleUrls: ['./main-direct-message-body.component.scss']
})
export class MainDirectMessageBodyComponent implements OnInit {

  @ViewChildren('messageElements') messageElements: QueryList<ElementRef>;
  storage = getStorage();
  pathReference = ref(this.storage, 'images/stars.jpg')
  Date = '';
  currentUser;
  currentChannelMessage;

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
      .collection('dms')
      .doc(this.currentUser.currentDM)
      .collection('messages')
      .valueChanges({ idField: 'messageID' })
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


  updateLastDate() {
   
    if (this.currentChannelMessage && this.currentChannelMessage.length > 0) {
      const lastMessage = this.currentChannelMessage[this.currentChannelMessage.length - 1]
      const date = new Date(lastMessage.timestamp)
      const dateString = date.toLocaleDateString('de-DE')
      this.Date = dateString
    
    }

  }

}
