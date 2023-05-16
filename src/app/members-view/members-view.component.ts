import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public Dialog: MatDialog,) { }

  ngOnInit(): void {

  }


  openDialogProfil(userID){

    this.Dialog.open(ProfileViewComponent, {
      data: {userID}
    })
}

}
