import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembersViewComponent>,
    public Dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(MembersViewComponent);
  }

  openDialogProfil(userId) {
    console.log(userId)
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
    this.dialogRef.close();
  }



}
