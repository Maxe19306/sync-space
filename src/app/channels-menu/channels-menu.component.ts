import { Component, OnInit } from '@angular/core';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../data.service';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-channels-menu',
  templateUrl: './channels-menu.component.html',
  styleUrls: ['./channels-menu.component.scss'],
})

export class ChannelsMenuComponent implements OnInit {

  mobileBreakpointGeneral: number;
  viewChannels = true;
  allChannels = [];
  currentUser;

  constructor(
    private dataService: DataService,
    public firestore: AngularFirestore,
    public Dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.loadCurrentUser();
    this.loadAllChannel();
  }

  getMobileBreakpointGeneral() {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--mobile-breakpoint-general').trim();
    this.mobileBreakpointGeneral = parseInt(value, 10);
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
    if (window.innerWidth <= this.mobileBreakpointGeneral) {
      this.foregroundMainChat();
    }
  }

  foregroundMainChat() {
    this.hideMenuSidebarLeft();
    this.changeLogoToBtn();
    this.foregroundMainChatChangeAttributs();
  }

  hideMenuSidebarLeft() {
    const sidebarLeft = document.getElementsByTagName("app-menu-sidebar-left")[0] as HTMLElement;
    sidebarLeft.style.display = 'none';
    const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
    menuSidebarLeftFAB.style.display = "none";
  }

  changeLogoToBtn() {
    const logoMobile = document.getElementById("logoMobile");
    logoMobile.style.display = "none";
    const channelsButtonMobile = document.getElementById("channelsButtonMobile");
    channelsButtonMobile.style.display = "block";
  }

  foregroundMainChatChangeAttributs() {
    const mainChat = document.getElementsByTagName("app-main-chat")[0] as HTMLElement;
    mainChat.style.display = "block";
  }

  // foreGroundMainChat() {
  //   const mainChats = document.getElementsByTagName("app-main-chat");
  //   const sidebarLefts = document.getElementsByTagName("app-menu-sidebar-left");
  //   if (mainChats.length > 0) {
  //     this.foreGroundMainChatChangeAttributs(mainChats, sidebarLefts);
  //   }
  // }

  // foreGroundMainChatChangeAttributs(mainChats, sidebarLefts) {
  //   const mainChat = mainChats[0] as HTMLElement;
  //   const sidebarLeft = sidebarLefts[0] as HTMLElement;
  //   const logoMobile = document.getElementById("logoMobile");
  //   const channelsButtonMobile = document.getElementById("channelsButtonMobile");
  //   const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
  //   mainChat.style.zIndex = '10000';
  //   sidebarLeft.style.zIndex = '0';
  //   logoMobile.style.display = "none";
  //   channelsButtonMobile.style.display = "block";
  //   menuSidebarLeftFAB.style.display = "none";
  // }

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
