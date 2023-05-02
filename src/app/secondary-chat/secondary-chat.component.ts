import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-secondary-chat',
  templateUrl: './secondary-chat.component.html',
  styleUrls: ['./secondary-chat.component.scss']
})
export class SecondaryChatComponent implements OnInit {
  currentUser: any;
  currentThread
  ChannelFromThread
  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
        this.loadCurrentUser()

        
  }

  loadCurrentUser(){
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .valueChanges({idField: 'customId'})
    .subscribe((user ) =>{
      this.currentUser = user
      console.log(this.currentUser)
      this.loadChannelFromThread()
      this.loadThread()
    })
  }

  loadChannelFromThread(){
    this.firestore
    .collection('channels')
    .doc(this.currentUser.ChannelFromThread)
    .valueChanges({idField: 'ChannelID'})
    .subscribe((channel) =>
    {this.ChannelFromThread = channel})
  }

  loadThread(){
    this.firestore
    .collection('channels')
    .doc(this.currentUser.ChannelFromThread)
    .collection('messages')
    .doc(this.currentUser.ThreadID)
    .valueChanges({idField: 'ThreadID'})
    .subscribe((thread) =>
    {this.currentThread = thread})
  }


  closeThread(){
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .update({
      openThread: false,
    })
  }
}
