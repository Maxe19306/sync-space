import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-secondary-chat-body',
  templateUrl: './secondary-chat-body.component.html',
  styleUrls: ['./secondary-chat-body.component.scss']
})
export class SecondaryChatBodyComponent implements OnInit {
  currentUser
  currentChannelMessage
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
      console.log('hallo', this.currentChannelMessage)
      

     })
  }

  sortsMessages() {
    this.currentChannelMessage.sort((a, b) => {
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
}
