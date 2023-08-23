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
  filteredUsers: any[]  = [];
  updateMembers = [];
  inputParticipants: string;
  addMembers = false;
  allUsers;
  selectedUser: any[]  = [];
  filterableUsers: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembersViewComponent>,
    public Dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadAllUsers()
    console.log(this.data)
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
        this.getCurrentInfoOfTheUsers()
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
  }
  
  filterUser() {
    if (this.filterableUsers && this.filterableUsers.length > 0 && this.inputParticipants.length > 0) {
      if (this.filterableUsers[0]) {
        this.filteredUsers = this.filterableUsers[0].filter(user =>
          user.name.toLowerCase().includes(this.inputParticipants.toLowerCase())
        )} 
    } else {
      this.filteredUsers = [];
    }
  }
    
 
  getCurrentInfoOfTheUsers() {
      this.data.members.forEach(member => {
      this.firestore
        .collection('users')
        .doc(member.id)
        .valueChanges({idField: 'id'})
        .subscribe((memberInfo) => {
          // Überprüfe, ob die Informationen bereits in der Liste sind
          const index = this.updateMembers.findIndex(existingMember => existingMember.id === memberInfo.id);
  
          if (index === -1) {
            this.updateMembers.push(memberInfo); // Speichere die aktualisierten Informationen
          }
        });
    }); 
  } 
  
  
  deleteMember(user){
    this.filterableUsers.push(user)
    const userIndex = this.selectedUser.indexOf(user)
    
    if(userIndex !== -1){
      this.data.members.splice(userIndex,1)
    }
    this.filterUser()
  } 
    
  pushUserToMember(user) {
    this.selectedUser.push(user);
    
    const userIndex1 = this.filterableUsers.indexOf(user)
    const userIndex2 = this.filteredUsers.indexOf(user)
    
    if(userIndex1 && userIndex2 !== -1)
    this.filterableUsers.splice(userIndex1,1)
    this.filteredUsers.splice(userIndex2,1)
  }
  
  
  addNewMembersToChannel(){
   this.selectedUser.forEach(user => {
      this.data.members.push(user)
   });
   
   
   this.firestore
   .collection('channels')
   .doc(this.data.channelId)
   .update({
    members: this.data.members
   })
   
  }
  
}
