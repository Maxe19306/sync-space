import { Component, OnInit } from '@angular/core';
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
  thread = false;
  currentUser
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private firestore: AngularFirestore,
    private sharedService: SharedService) {

    this.sharedService.hideMenuSidebarLeft$.subscribe(() => {
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
    document.getElementById("menuSidebarLeft").classList.toggle("slide__out__left");
  }
}



