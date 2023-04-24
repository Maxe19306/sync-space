import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-main-chat-footer',
  templateUrl: './main-chat-footer.component.html',
  styleUrls: ['./main-chat-footer.component.scss']
})
export class MainChatFooterComponent implements OnInit {
  currentUser
  message: Message = new Message({})
  constructor(public dataService : DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadCurrentUser()

  }

  test(){
    this.message.creator = this.currentUser; 
    this.message.timestamp = new Date().getTime();
     this.firestore
     .collection('channels')
     .doc(this.currentUser.lastChannel)
     .collection('messages')
     .add(this.message.toJSON())
  }

  loadCurrentUser(){
    this.firestore
     .collection('users')
     .doc(this.dataService.id)
     .valueChanges({idField: 'id'})
     .subscribe((user) =>{
      this.currentUser = user;
     })
  }

}
