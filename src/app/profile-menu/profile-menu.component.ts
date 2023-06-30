import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger
  @Input() userID:any;
  CurrentUser;
  constructor(
    public Dialog: MatDialog,
    private firestore: AngularFirestore
    ) { }


  ngOnInit(): void {
     this.loadCurrentUser()
  }

  loadCurrentUser(){
    this.firestore
    .collection('users')
    .doc(this.userID)
    .valueChanges({idField: 'id'})
    .subscribe((user) => {
      this.CurrentUser = user

    });
  }


  openDialogProfil(userID){
      this.Dialog.open(ProfileViewComponent, {
        data: {userID}
      })
  }

  displayOverlay() {
    this.overlay.nativeElement.style.display = 'flex';
  }

  hideOverlay() {
    this.overlay.nativeElement.style.display = 'none';
  }
}
