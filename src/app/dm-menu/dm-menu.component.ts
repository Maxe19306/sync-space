import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dm-menu',
  templateUrl: './dm-menu.component.html',
  styleUrls: ['./dm-menu.component.scss']
})

export class DmMenuComponent implements OnInit {

  mobileBreakpointGeneral: number;
  viewChannels = false;
  personalDm
  allDmsIdFromUser;
  allDmsFromUser = [];
  currentUser

  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.loadAllDms()
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
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user;
      })
  }

  loadAllDms() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .collection('dmsFromUser')
      .valueChanges({ idField: 'id' })
      .subscribe((dm) => {
        this.allDmsIdFromUser = dm
        this.loadAllChats()
      }
      )
  }

  determinePersonalChat() {
    this.allDmsFromUser.forEach(element => {
      const member1 = element.members[0]
      const member2 = element.members[1]

      if (member1.id === member2.id) {
        this.personalDm = element
      }


    });
  }

  viewNoChannels() {
    this.viewChannels = false;
  }

  viewAllDMS() {
    if (!this.viewChannels) {
      this.viewChannels = true;
    }
    else {
      this.dmSlideUpClass();
      setTimeout(() => {
        this.viewChannels = false;
      }, 100);
    }
  }

  dmSlideUpClass() {
    const dmChannelsBody = document.getElementById("dmChannelsBody") as HTMLDivElement;
    dmChannelsBody.classList.remove("drop__drown__animation");
    dmChannelsBody.classList.add("slide__up__animation");
  }

  loadAllChats() {
    this.allDmsIdFromUser.forEach(dm => {
      this.firestore
        .collection('dms')
        .doc(dm.DMID)
        .valueChanges({ idField: 'DmId' })
        .subscribe(dmData => {
          const existingDm = this.allDmsFromUser.find(d => d.DmId === dmData.DmId);
          if (!existingDm) {
            this.allDmsFromUser.push(dmData);
            this.determinePersonalChat()
          }
        });
    });
  }

  openChat(id) {
    this.foregroundMainDirectMessageAttributs();
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        viewChat: true,
        currentDM: id
      })
      if (window.innerWidth <= this.mobileBreakpointGeneral) {
        this.foregroundMainDirectMessage();
      }
      this.hideSecondaryChat();
  }

  foregroundMainDirectMessage() {
    this.hideMenuSidebarLeft();
    this.changeLogoToBtn();
    this.foregroundMainDirectMessageAttributs();
  }

  hideMenuSidebarLeft() {
    const sidebarLeft = document.getElementsByTagName("app-menu-sidebar-left")[0] as HTMLElement;
    if (sidebarLeft) {
      sidebarLeft.style.display = 'none';
    }
    const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
    menuSidebarLeftFAB.style.display = "none";
  }

  changeLogoToBtn() {
    const logoMobile = document.getElementById("logoMobile");
    logoMobile.style.display = "none";
    const channelsButtonMobile = document.getElementById("channelsButtonMobile");
    channelsButtonMobile.style.display = "block";
  }

  hideSecondaryChat() {
    const secondaryChat = document.getElementsByTagName("app-secondary-chat")[0] as HTMLElement;
    if (secondaryChat) {
      secondaryChat.style.display = "none";
      secondaryChat.style.width= "auto";
      secondaryChat.style.marginLeft = 25 + "px";
      secondaryChat.style.backgroundColor = "white";
    }
  }

  foregroundMainDirectMessageAttributs() {
    const mainDirectMessages = document.getElementsByTagName("app-main-direct-message");
    if (mainDirectMessages.length > 0) {
      const mainDirectMessage = mainDirectMessages[0] as HTMLElement;
      mainDirectMessage.style.display = 'block';
    }
  }

  // foregroundMainDirectMessage() {
  //   const mainDirectMessages = document.getElementsByTagName("app-main-direct-message");
  //   const sidebarLefts = document.getElementsByTagName("app-menu-sidebar-left");
  //   if (mainDirectMessages.length > 0) {
  //     this.foregroundMainDirectMessageChangeAttributs(mainDirectMessages, sidebarLefts);
  //   }
  // }

  // foregroundMainDirectMessageChangeAttributs(mainDirectMessages, sidebarLefts) {
  //   const mainDirectMessage = mainDirectMessages[0] as HTMLElement;
  //   const sidebarLeft = sidebarLefts[0] as HTMLElement;
  //   const logoMobile = document.getElementById("logoMobile");
  //   const channelsButtonMobile = document.getElementById("channelsButtonMobile");
  //   const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
  //   mainDirectMessage.style.zIndex = '10000';
  //   sidebarLeft.style.zIndex = '0';
  //   logoMobile.style.display = "none";
  //   channelsButtonMobile.style.display = "block";
  //   menuSidebarLeftFAB.style.display = "none";
  // }
}
