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
  @ViewChild('sidebarLeftPlaceholder') sidebarLeftPlaceholder: ElementRef;

  menuSidebarLeft

  thread = false;
  currentUser
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private firestore: AngularFirestore,
    private sharedService: SharedService) {

    this.sharedService.toggleMenuSidebarLeft$.subscribe(() => {
      this.toggleSlideOutClass();
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

  toggleSlideOutClass() {
    
    // this.sidebarLeftPlaceholder.nativeElement.style.display = "flex";
    
    // this.sidebarLeftPlaceholder.nativeElement.classList.toggle("sidebar__left__reduce__width");
    // document.getElementById("menuSidebarLeft").style.visibility = "hidden";
    this.menuSidebarLeft = document.getElementById("menuSidebarLeft");

    console.log("this.menuSidebarLeft", this.menuSidebarLeft);

    this.menuSidebarLeft.style.visibility = "hidden";
    this.menuSidebarLeft.classList.toggle("sidebar__left__reduce__width2");

  }
}



