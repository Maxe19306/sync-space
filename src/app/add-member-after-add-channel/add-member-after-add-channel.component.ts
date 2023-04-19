import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-member-after-add-channel',
  templateUrl: './add-member-after-add-channel.component.html',
  styleUrls: ['./add-member-after-add-channel.component.scss']
})
export class AddMemberAfterAddChannelComponent implements OnInit {

  
  
  constructor(
    public dialogRef: MatDialogRef<AddMemberAfterAddChannelComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private firestore: AngularFirestore,
  public dataservice: DataService) { }

  CurrentUser


  inputParticipants: string;
  filteredUsers: any [];
  certainPeople = false;
  allUsers;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  ngOnInit() {
    this.loadAllUsers()
    this.loadCurrentUser()
  }

  closeDialog(){
    this.dialogRef.close(AddMemberAfterAddChannelComponent)
  }

  loadCurrentUser(){
    this.firestore
    .collection('users')
    .doc(this.dataservice.id)
    .valueChanges({idField: 'id'})
    .subscribe((user) => {
      this.CurrentUser = user
      console.log(this.CurrentUser)
    });
  }


    loadAllUsers(){
      this.firestore
   .collection('users')
   .valueChanges({idField: 'customIdName'})
   .subscribe((user:any) => {
    this.allUsers = user
   })
    }



  test(){

    this.data.founder = this.CurrentUser
      if(!this.certainPeople){
      this.data.members = this.allUsers;
      console.log(this.data)
      this.firestore
      .collection('channels')
      .add(this.data.toJSON())
    }

    else(
      this.firestore
      .collection('channels')
      .add(this.data.toJSON())
    )
    this.closeDialog()
 }

 hallo(){
  this.certainPeople = false;
 }
 hallo1(){
this.certainPeople = true;
 }

 filterUser() {
  this.filteredUsers = this.allUsers.filter(user => 
        user.Name
       .toLowerCase()
       .includes(this.inputParticipants.toLowerCase())
);
}

hallo2(user){
  console.log(user)
    this.data.members.push(user)
    console.log('channel', this.data.members)
}
    
} 
