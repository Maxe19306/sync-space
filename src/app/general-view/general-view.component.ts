import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  menuSidebarLeft;
  secondaryChat;

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

  }

  ngOnInit(): void {
    this.dataService.id = this.route.snapshot.queryParamMap.get('userID')
    this.loadCurrentUser()
  }
  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'customerID' })
      .subscribe((user) => {
        this.currentUser = user;

      })
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

  toggleSlideSecondaryChat() {
    this.secondaryChat = document.getElementById("secondaryChat");
    console.log("secondaryChat", this.secondaryChat);

    this.secondaryChat.style.visibility = "hidden";
    this.secondaryChat.classList.add("secondary__chat__reduce__width");
  }
}