import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main-chat-body',
  templateUrl: './main-chat-body.component.html',
  styleUrls: ['./main-chat-body.component.scss']
})
export class MainChatBodyComponent implements OnInit {
  currentUser;
  currentChannelMessage
  constructor(
    public dataService : DataService,
    private firestore: AngularFirestore) { }

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
      this.loadChannel()
     })
  }

  loadChannel(){
    this.firestore
     .collection('channels')
     .doc(this.currentUser.lastChannel)
     .collection('messages')
     .valueChanges({idField: 'id'})
     .subscribe((channel) =>{
      this.currentChannelMessage = channel;
      this.sortsMessages()
      console.log(this.currentChannelMessage)

     })
  }

  sortsMessages() {
    this.currentChannelMessage.sort((a, b) => {
      return Number(a.timestampe) - Number(b.timestampe);
    });
  }
}
