import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { currentUser } from '../models/currentUser.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileViewComponent>,
    private firestore: AngularFirestore,
    public dialog : MatDialog,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }


    CurrentUser;


  ngOnInit(): void {
    this.loadCurrentUser()
   
  }

 loadCurrentUser() {
  console.log(this.data)
  this.firestore
  .collection('users')
  .doc(this.data.userID)
  .valueChanges()
  .subscribe((user) => {
    this.CurrentUser = user
  });
  }

  closeDialog(){
    this.dialogRef.close(ProfileViewComponent)
  }

  createDM(){
      console.log(this.data.userID, this.dataService.id)
  }

}
