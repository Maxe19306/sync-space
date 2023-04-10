import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { ProfileViewComponent } from '../profile-view/profile-view.component';



@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger
  @Input() userinfo:any;

  constructor(
    public Dialog: MatDialog,
    ) { }

  currentUserID;

  ngOnInit(): void {
    
  }


  openDialogProfil(userID){
      this.Dialog.open(ProfileViewComponent, {
        data: {userID}
      })
  }
}
