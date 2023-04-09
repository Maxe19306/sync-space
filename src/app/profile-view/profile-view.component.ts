import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { currentUser } from '../models/currentUser.class';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore
  ) { }


    CurrentUserID = 'M8SGwifEJntU27nZA4kR';
    CurrentUser;


  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
  
    this.firestore
      .collection('users')
      .doc(this.CurrentUserID)
      .valueChanges()
      .subscribe((user) => {
        this.CurrentUser = user
      });
  }



}
