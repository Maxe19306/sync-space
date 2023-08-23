import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})
export class MembersViewComponent implements OnInit {

  addMembers = false;
  allUsers;
  filterableUsers: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembersViewComponent>,
    public Dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadAllUsers()
  }

  closeDialog() {
    this.dialogRef.close(MembersViewComponent);
    
  }

  loadAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'id' })
      .subscribe((user: any) => {
        this.allUsers = user
        this.createTheFilterableUsers()
      })
  }
  
  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
    this.dialogRef.close();
  }

  activAddMembers(){
    this.addMembers = true;
  }
  
  createTheFilterableUsers(){
    const nonMembers = this.allUsers.filter(user => !this.data.members.some(member => member.id === user.id));
       this.filterableUsers.push(nonMembers)
       console.log(this.filterableUsers)
  }

}
