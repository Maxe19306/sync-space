import { Component, Renderer2, ElementRef, ViewChild, Inject, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss']
})

export class MembersViewComponent implements OnInit {

  @ViewChild('usersToAdd', { static: false }) usersToAdd: ElementRef;
  test = true;
  filteredUsers: any[] = [];
  updateMembers = [];
  inputParticipants: string;
  addMembers = false;
  allUsers;
  selectedUser: any[] = [];
  filterableUsers: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MembersViewComponent>,
    public Dialog: MatDialog,
    private firestore: AngularFirestore,
    private renderer: Renderer2,
    private _eref: ElementRef) { }

  ngOnInit(): void {
    this.loadAllUsers()
    this.test2()
  }

  closeDialog() {
    this.dialogRef.close(MembersViewComponent);
  }

  test2() {
    this.test = this.data.test
    if (!this.test) {
      this.addMembers = true;
    }
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

  activAddMembers() {
    this.addMembers = true;
  }

  createTheFilterableUsers() {
    const nonMembers = this.allUsers.filter(user => !this.data.members.some(member => member.id === user.id));
    this.filterableUsers = this.filterableUsers.concat(nonMembers);  //  this.filterableUsers.push(nonMembers)   concat verbindet die beiden arrays. somit entsteht kein array im array.
  }

  filterUser() {
    if (this.filterableUsers.length > 0 && this.inputParticipants.length > 0) {
      this.filteredUsers = this.filterableUsers.filter(user =>            //this.filteredUsers = this.filterableUsers[0].filter(user =>                 
        user.name.toLowerCase().includes(this.inputParticipants.toLowerCase()),
      )
    } else {
      this.filteredUsers = [];
    }
  }

  getCurrentInfoOfTheUsers() {
    this.data.members.forEach(member => {
      this.firestore
        .collection('users')
        .doc(member.id)
        .valueChanges({ idField: 'id' })
        .subscribe((memberInfo) => {
          // Überprüfe, ob die Informationen bereits in der Liste sind
          const index = this.updateMembers.findIndex(existingMember => existingMember.id === memberInfo.id);
          if (index === -1) {
            this.updateMembers.push(memberInfo); // Speichere die aktualisierten Informationen
          }
        });
    });
  }

  deleteMember(user) {
    this.filterableUsers.push(user)
    const userIndex = this.selectedUser.indexOf(user)
    this.selectedUser.splice(userIndex, 1);
    if (userIndex !== -1) {
      this.data.members.splice(userIndex, 1)
    }
    this.filterUser()
  }

  pushUserToMember(user) {
    console.log("user", user);
    this.selectedUser.push(user);
    const userIndex1 = this.filterableUsers.findIndex(u => u.id === user.id);  // hier geändert dass nur die id verglichen wird und nicht der ganze user
    const userIndex2 = this.filteredUsers.findIndex(u => u.id === user.id);    // hier geändert dass nur die id verglichen wird und nicht der ganze user 
    this.filterableUsers.splice(userIndex1, 1)
    this.filteredUsers.splice(userIndex2, 1)
    this.filteredUsers = [];
    this.inputParticipants = '';
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this._eref.nativeElement.contains(event.target)) {
      this.filteredUsers = [];
      this.inputParticipants = '';
    }
  }

  addNewMembersToChannel() {
    this.selectedUser.forEach(user => {
      this.data.members.push(user)
    });
    this.firestore
      .collection('channels')
      .doc(this.data.channelId)
      .update({
        members: this.data.members
      })
    this.closeDialog()
  }

}
