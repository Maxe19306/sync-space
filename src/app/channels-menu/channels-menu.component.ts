import { Component, OnInit } from '@angular/core';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../data.service';


@Component({
  selector: 'app-channels-menu',
  templateUrl: './channels-menu.component.html',
  styleUrls: ['./channels-menu.component.scss'],
})
export class ChannelsMenuComponent implements OnInit {
  viewChannels = true;
  allChannels = []
  currentUser
  constructor(
    private dataService : DataService,
    public firestore: AngularFirestore,
    public Dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAllChannel()
  }

  loadAllChannel(){
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'channelIdName'})
    .subscribe((channels) =>
    {
      this.allChannels = channels;
      console.log(this.allChannels)
    })
  }

  

  viewNoChannels(){
    this.viewChannels = false;
  }

  viewAllChannels(){
    this.viewChannels = true;
  }

  openCreateNewChannelDialog(){
    this.Dialog.open(CreateChannelComponent)
  }

  test(channelID){
    
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .update({
      lastChannel: channelID
    })

  }

  changeChannelView(){
    if(this.viewChannels) {
      this.viewNoChannels()
      console.log(this.viewChannels)
    }
    else(
     this.viewAllChannels()
    )
  }

}
