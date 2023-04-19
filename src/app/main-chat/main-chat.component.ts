import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent implements OnInit {
  CurrentChannel;
  currentUser
  constructor(
    public dataService : DataService,
    public Dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
   this.loadCurrentUser()
  }

openDialogChannelView(ChannelId){
  this.Dialog.open(ChannelViewComponent, {
    data: {ChannelId}
  })
  
}

loadCurrentUser(){
  this.firestore
   .collection('users')
   .doc(this.dataService.id)
   .valueChanges({idField: 'id'})
   .subscribe((user) =>{
    this.currentUser = user;
    this.loadLastChannel()
   })
}

loadLastChannel(){
  this.firestore
  .collection('channels')
  .doc(this.currentUser.lastChannel)
  .valueChanges({idField: 'id'})
  .subscribe((channel)=> {
    this.CurrentChannel = channel
  })
}

}
