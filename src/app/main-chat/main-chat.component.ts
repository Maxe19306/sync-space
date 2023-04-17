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
  constructor(
    public dataService : DataService,
    public Dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.firestore
    .collection('channels')
    .doc(this.dataService.id)
    .valueChanges()
    .subscribe((channel) => {
      this.CurrentChannel = channel
      console.log(this.CurrentChannel)
    });
  }

openDialogChannelView(ChannelId){
  console.log(ChannelId)
  this.Dialog.open(ChannelViewComponent, {
    data: {ChannelId}
  })
  
}

test(){
  console.log(this.dataService.id)
}
}
