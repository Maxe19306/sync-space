import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-secondary-chat',
  templateUrl: './secondary-chat.component.html',
  styleUrls: ['./secondary-chat.component.scss']
})

export class SecondaryChatComponent implements OnInit {

  mobileBreakpointGeneral: number;
  currentUser: any;
  currentThread
  ChannelFromThread

  constructor(public dataService: DataService,
    private firestore: AngularFirestore,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.loadCurrentUser()
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
      .valueChanges({ idField: 'customId' })
      .subscribe((user) => {
        this.currentUser = user

        this.loadChannelFromThread()
        this.loadThread()
      })
  }

  loadChannelFromThread() {
    this.firestore
      .collection('channels')
      .doc(this.currentUser.ChannelFromThread)
      .valueChanges({ idField: 'ChannelID' })
      .subscribe((channel) => { this.ChannelFromThread = channel })
  }

  loadThread() {
    this.firestore
      .collection('channels')
      .doc(this.currentUser.ChannelFromThread)
      .collection('messages')
      .doc(this.currentUser.ThreadId)
      .valueChanges({ idField: 'ThreadID' })
      .subscribe((thread) => { this.currentThread = thread })
  }


  closeThread() {
    this.sharedService.slideSecondaryChat();
    setTimeout(() => {
      this.firestore
        .collection('users')
        .doc(this.dataService.id)
        .update({
          openThread: false,
        })
    }, 100);
    if (window.innerWidth <= this.mobileBreakpointGeneral) {
      this.foregroundSidebarLeft();
    }
  }

  foregroundSidebarLeft() {
    this.hideMainChat();
    this.hideMainDirectMessage();
    this.hideSecondaryChat();
    this.changeBtnToLogo();
    this.foregroundSidebarLeftChangeAttributs();
  }

  hideMainChat() {
    const mainChat = document.getElementsByTagName("app-main-chat")[0] as HTMLElement;
    if (mainChat) {
      mainChat.style.display = "none";
    }
  }

  hideMainDirectMessage() {
    const mainDirectMessage = document.getElementsByTagName("app-main-direct-message")[0] as HTMLElement;
    if (mainDirectMessage) {
      mainDirectMessage.style.display = "none";
    }
  }

  hideSecondaryChat() {
    const secondaryChat = document.getElementsByTagName("app-secondary-chat")[0] as HTMLElement;
    if (secondaryChat) {
      secondaryChat.style.display = 'none';
    }
  }

  changeBtnToLogo() {
    const channelsButtonMobile = document.getElementById("channelsButtonMobile");
    channelsButtonMobile.style.display = "none";
    const logoMobile = document.getElementById("logoMobile");
    logoMobile.style.display = "block";
  }

  foregroundSidebarLeftChangeAttributs() {
    const sidebarLeft = document.getElementsByTagName("app-menu-sidebar-left")[0] as HTMLElement;
    sidebarLeft.style.display = 'flex';
    const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
    menuSidebarLeftFAB.style.display = "inline-block";
  }
}
