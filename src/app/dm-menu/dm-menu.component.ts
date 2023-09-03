import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dm-menu',
  templateUrl: './dm-menu.component.html',
  styleUrls: ['./dm-menu.component.scss'],
})
export class DmMenuComponent implements OnInit {
  mobileBreakpointGeneral: number;
  viewChannels = false;
  personalDm;
  allDmsFromUser = [];
  currentUser;
  finalDm = [];

  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
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
        this.loadAllDms();
      });
  }

  loadAllDms() {
    this.firestore
      .collection('users')
      .doc(this.currentUser.id)
      .collection('dmsFromUser')
      .valueChanges({ idField: 'id' })
      .subscribe((dm) => {
        this.loadAllChats(dm); // lädt alle chat die im user hinterlegt wird herunter und ruft funktion auf, die diese dms herunterlädt
      });
  }

  viewNoChannels() {
    this.viewChannels = false;
  }

  viewAllDMS() {
    if (!this.viewChannels) {
      this.viewChannels = true;
    } else {
      this.dmSlideUpClass();
      setTimeout(() => {
        this.viewChannels = false;
      }, 100);
    }
  }

  dmSlideUpClass() {
    const dmChannelsBody = document.getElementById(
      'dmChannelsBody'
    ) as HTMLDivElement;
    dmChannelsBody.classList.remove('drop__drown__animation');
    dmChannelsBody.classList.add('slide__up__animation');
  }

  loadAllChats(dm) {
    dm.forEach((dms) => {
      this.firestore
        .collection('dms')
        .doc(dms.DMID)
        .valueChanges({ idField: 'DmId' })
        .subscribe((dmData) => {
          this.determineDM(dmData);
        });
    });
  }

  determineDM(dmData) {
    if (dmData.members[0].id === dmData.members[1].id) {
      this.personalDm = dmData.DmId;
    } else this.loadFinalDms(dmData);
  }

  loadFinalDms(dm) {
    dm.members.forEach((user) => {
      if (user.id !== this.currentUser.id) {
        const dmId = dm.DmId;
        this.firestore
          .collection('users')
          .doc(user.id)
          .valueChanges({ idField: 'DmId' })
          .subscribe((finalUser) => {
            const isDmIdInFinalDm = this.finalDm.some(
              (item) => item.dmId === dmId
            );
            if (!isDmIdInFinalDm) { // wird nur hinzugefügt wenn die Dmid noch nicht enthalten ist. Sonst entstehen duplikate und der chat wird öfter angezeigt.
              this.finalDm.push({ finalUser, dmId });
            }
          });
      }
    });
  }

  openChat(id) {
    this.foregroundMainDirectMessageAttributs();
    this.firestore.collection('users').doc(this.dataService.id).update({
      viewChat: true,
      currentDM: id,
    });
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
    const sidebarLeft = document.getElementsByTagName(
      'app-menu-sidebar-left'
    )[0] as HTMLElement;
    if (sidebarLeft) {
      sidebarLeft.style.display = 'none';
    }
    const menuSidebarLeftFAB = document.getElementById('menuSidebarLeftFAB');
    menuSidebarLeftFAB.style.display = 'none';
  }

  changeLogoToBtn() {
    const logoMobile = document.getElementById('logoMobile');
    logoMobile.style.display = 'none';
    const channelsButtonMobile = document.getElementById(
      'channelsButtonMobile'
    );
    channelsButtonMobile.style.display = 'block';
  }

  hideSecondaryChat() {
    const secondaryChat = document.getElementsByTagName(
      'app-secondary-chat'
    )[0] as HTMLElement;
    if (secondaryChat) {
      secondaryChat.style.display = 'none';
      secondaryChat.style.width = 'auto';
      secondaryChat.style.marginLeft = 25 + 'px';
      secondaryChat.style.backgroundColor = 'white';
    }
  }

  foregroundMainDirectMessageAttributs() {
    const mainDirectMessages = document.getElementsByTagName(
      'app-main-direct-message'
    );
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
