import { Component, OnInit, ViewChild, Input } from '@angular/core';
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

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger
  @Input() userID:any;
  CurrentUser;
  constructor(
    public Dialog: MatDialog,
    private firestore: AngularFirestore
    ) { }


  ngOnInit(): void {
      this.firestore
      .collection('users')
      .doc(this.userID)
      .valueChanges()
      .subscribe((user) => {
        this.CurrentUser = user
        console.log(this.CurrentUser)
      });
  }


  openDialogProfil(userID){
      this.Dialog.open(ProfileViewComponent, {
        data: {userID}
      })
  }
}
