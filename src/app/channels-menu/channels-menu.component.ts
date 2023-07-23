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
    private dataService: DataService,
    public firestore: AngularFirestore,
    public Dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
    this.loadAllChannel()
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user

      });
  }

  loadAllChannel() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelIdName' })
      .subscribe((channels: any[]) => {
        channels.forEach((channel) => {
          channel.members.forEach((member) => {
            if (this.currentUser.id === member.id) {
              const channelIndex = this.allChannels.findIndex((existingChannel) => existingChannel.channelIdName === channel.channelIdName);
              if (channelIndex === -1) {
                this.allChannels.push(channel)
              }
            }
          })
        })
      })
  }



  viewNoChannels() {
    this.viewChannels = false;
  }

  viewAllChannels() {
    this.viewChannels = true;
  }

  openCreateNewChannelDialog() {
    this.Dialog.open(CreateChannelComponent, {
      panelClass: 'new__channel__matdialog'
    })
  }

  openChannel(channelId) {

    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        lastChannel: channelId,
        viewChat: false
      })

  }

  changeChannelView() {
    if (this.viewChannels) {
      this.dmSlideUpClass();
      setTimeout(() => {
        this.viewNoChannels();
      }, 100);
    }
    else {
      this.viewAllChannels();
    }
  }

  dmSlideUpClass() {
    const channelsBody = document.getElementById("channelsBody") as HTMLDivElement;
    channelsBody.classList.remove("drop__drown__animation");
    channelsBody.classList.add("slide__up__animation");
  }

}
