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
    CurrentUser: currentUser[] = [];


  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.CurrentUserID)
      .valueChanges({ idField: 'id' }) // idField hinzufügen, um TypeScript-Fehler zu vermeiden
      .subscribe((user: currentUser) => {
        this.CurrentUser = [user]; // als einzelnes Element in ein Array einfügen
      });
  }


}
