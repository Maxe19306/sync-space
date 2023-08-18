import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-workspaces',
  templateUrl: './home-workspaces.component.html',
  styleUrls: ['./home-workspaces.component.scss']
})

export class HomeWorkspacesComponent implements OnInit {
  @ViewChild('logoContainer') logoContainer: ElementRef;
  @ViewChild('logoDefault') logoDefault: ElementRef;
  @ViewChild('logoHover') logoHover: ElementRef;

  @ViewChild('logoClosedContainer') logoClosedContainer: ElementRef;
  @ViewChild('logoClosedDefault') logoClosedDefault: ElementRef;
  @ViewChild('logoClosedHover') logoClosedHover: ElementRef;

  constructor(private sharedService: SharedService) { }

  toggleMenuSidebarLeft() {
    this.toggleLogoDefaultClosed();
    this.sharedService.toggleMenuSidebarLeft();
  }

  ngOnInit(): void {

  }

  highlightDefaultLogo() {
    this.logoDefault.nativeElement.style.display = "none"
    this.logoHover.nativeElement.style.display = "block";
  }

  unHighlightDefaultLogo() {
    this.logoHover.nativeElement.style.display = "none"
    this.logoDefault.nativeElement.style.display = "block";
  }

  highlightClosedLogo() {
    this.logoClosedDefault.nativeElement.style.display = "none"
    this.logoClosedHover.nativeElement.style.display = "block";
  }

  unHighlightClosedLogo() {
    this.logoClosedHover.nativeElement.style.display = "none"
    this.logoClosedDefault.nativeElement.style.display = "block";
  }

  toggleLogoDefaultClosed() {
    if (this.logoClosedContainer.nativeElement.style.display === "none") {
      this.logoContainer.nativeElement.style.display = "none";
      this.logoClosedContainer.nativeElement.style.display = "block";
      this.logoClosedHover.nativeElement.style.display = "block";
    }
    else {
      this.logoContainer.nativeElement.style.display = "block";
      this.logoClosedContainer.nativeElement.style.display = "none"
    }
  }

  foregroundSidebarLeft() {
    this.hideMainChat();
    this.changeBtnToLogo();
    this.foregroundSidebarLeftChangeAttributs();
  }

  hideMainChat() {
    const mainChat = document.getElementsByTagName("app-main-chat")[0] as HTMLElement;
    mainChat.style.display = "none";
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

  // foreGroundLeftSidebar() {
  //   const mainChats = document.getElementsByTagName("app-main-chat");
  //   const sidebarLefts = document.getElementsByTagName("app-menu-sidebar-left");
  //   if (mainChats.length > 0) {
  //     this.foreGroundLeftSidebarChangeAttributs(mainChats, sidebarLefts);
  //   }
  // }

  // foreGroundLeftSidebarChangeAttributs(mainChats, sidebarLefts) {
  //   const mainChat = mainChats[0] as HTMLElement;
  //   const sidebarLeft = sidebarLefts[0] as HTMLElement;
  //   const logoMobile = document.getElementById("logoMobile");
  //   const channelsButtonMobile = document.getElementById("channelsButtonMobile");
  //   const menuSidebarLeftFAB = document.getElementById("menuSidebarLeftFAB");
  //   mainChat.style.zIndex = '0';
  //   sidebarLeft.style.zIndex = '10000';
  //   logoMobile.style.display = "block";
  //   channelsButtonMobile.style.display = "none";
  //   menuSidebarLeftFAB.style.display = "inline-block";
  // }
}
