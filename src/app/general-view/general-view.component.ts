import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../shared.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})

export class GeneralViewComponent implements OnInit {

  mobileBreakpointGeneral: number;
  windowWidth: number;
  menuSidebarLeft;
  secondaryChat;
  firstChannel
  thread = false;
  currentUser
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private firestore: AngularFirestore,
    private sharedService: SharedService) {

    this.sharedService.toggleMenuSidebarLeft$.subscribe(() => {
      this.toggleSlideSidebarLeft();
    });

    this.sharedService.openSecondaryChat$.subscribe(() => {
      this.openSecondaryChat();
    });

    this.sharedService.slideSecondaryChat$.subscribe(() => {
      this.slideSecondaryChat();
    });

  }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.windowWidth = window.innerWidth;
    this.dataService.id = this.route.snapshot.queryParamMap.get('userID');
    this.loadCurrentUser();
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
        this.currentUser = user;
        if (!this.currentUser.addFirstChannel) {
          this.loadTheFirstChannel()
        }

      })
  }

  loadTheFirstChannel() {
    this.firestore
      .collection('channels')
      .doc('CTk07uhNkmfsNkGNJgTn')
      .valueChanges({ idField: 'id' })
      .subscribe((channel) => {
        this.firstChannel = channel;
        this.changeAddFristChannelFromTheUser()
      })
  }

  changeAddFristChannelFromTheUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        addFirstChannel: true
      })
    this.addUserToChannel()
  }

  addUserToChannel() {
    const currentUserId = this.currentUser.id;
    const userIndex = this.firstChannel.members.findIndex(user => user.id === currentUserId);
    if (userIndex !== -1) {
      // Der Benutzer ist bereits im Array vorhanden
    } else {
      // Der Benutzer ist nicht im Array
      this.firstChannel.members.push(this.currentUser);
      this.firestore
        .collection('channels')
        .doc('CTk07uhNkmfsNkGNJgTn')
        .update({
          members: this.firstChannel.members,
        })
    }
  }



  toggleSlideSidebarLeft() {
    this.menuSidebarLeft = document.getElementById("menuSidebarLeft");
    if (this.menuSidebarLeft.classList.contains("sidebar__left__reduce__width")) {
      setTimeout(() => {
        this.menuSidebarLeft.style.visibility = "visible";
      }, 100);
    } else {
      this.menuSidebarLeft.style.visibility = "hidden";
    }
    this.menuSidebarLeft.classList.toggle("sidebar__left__reduce__width");
  }

  async openSecondaryChat() {
    this.secondaryChat = document.getElementById("secondaryChat");
    this.secondaryChat.style.display = "block";
    setTimeout(() => {
      if (window.innerWidth > 1400) {
        this.secondaryChat.style.width = 485 + "px";
      }
      if (window.innerWidth <= 1400) {
        this.secondaryChat.style.width = 545 + "px";
      }
      this.secondaryChat.style.marginLeft = 25 + "px";
      if (window.innerWidth <= this.mobileBreakpointGeneral) {
        this.secondaryChat.style.marginLeft = 0 + "px";
      }
    }, 1);
    setTimeout(() => {
      this.secondaryChat.style.visibility = "visible";
    }, 99);
  }

  slideSecondaryChat() {
    this.secondaryChat = document.getElementById("secondaryChat");
    this.secondaryChat.style.visibility = "hidden";
    this.secondaryChat.style.width = 0 + "px";
    this.secondaryChat.style.padding = 0 + "px";
    this.secondaryChat.style.marginLeft = 0 + "px";
    setTimeout(() => {
      this.secondaryChat.style.display = "none";
    }, 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth <= this.mobileBreakpointGeneral) {
      this.changeBtnToLogo();
      this.foregroundSidebarLeftChangeAttributs();
    } else {
      this.changeBtnToLogo();
    }
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

  foregroundMainChatChangeAttributs() {
    const mainChats = document.getElementsByTagName("app-main-chat");
    if (mainChats.length > 0) {
      const mainChat = mainChats[0] as HTMLElement;
      mainChat.style.display = 'block';
    }
  }
}