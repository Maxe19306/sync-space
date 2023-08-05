import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { currentUser } from '../models/currentUser.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DirectMessage } from '../models/dm.class';
import { MembersViewComponent } from '../members-view/members-view.component';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  DM: DirectMessage = new DirectMessage({});

  constructor(
    public dialogRef: MatDialogRef<ProfileViewComponent>,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  userDetail;
  currentUser;

  editMode = false;
  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;

  ngOnInit(): void {
    this.loadUserDetail();
    this.loadCurrentUser();
  }

  loadUserDetail() {
    this.firestore
      .collection('users')
      .doc(this.data.userId)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.userDetail = user;
        console.log(this.userDetail)
      });
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user
      });
  }


  closeDialog() {
    this.dialogRef.close(ProfileViewComponent)
  }

  async initiateEditMode() {
    this.editMode = true;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.userNameInput.nativeElement.focus();
  }

  overwriteUserDataBackend() {
    this.firestore
      .collection('users')
      .doc(this.data.userId)
      .update({
        name: this.currentUser.name
      })
    this.editMode = false;
  }

  createDM() {
    const currentUser = {
      name: this.currentUser.name,
      id: this.currentUser.id
    };

    const userDetail = {
      name: this.userDetail.name,
      id: this.userDetail.id
    };

    const members = [currentUser, userDetail];
    console.log(members, this.DM)
    // Überprüfen, ob ein Chat mit den Mitgliedern bereits existiert
    this.firestore.collection('dms')
      .ref.where('members', '==', members)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Ein Chat mit diesen Mitgliedern existiert bereits
          querySnapshot.forEach((doc) => {
            const chatId = doc.id;
            console.log('Ein Chat mit diesen Mitgliedern existiert bereits. Chat-ID:', chatId);
            this.closeDialog()
            this.openChat(chatId)
            // Hier kannst du die Chat-ID verwenden oder entsprechende Aktionen durchführen
          });
        } else {
          // Ein Chat mit den Mitgliedern existiert nicht, erstelle einen neuen DM

          this.DM.members = members;
          this.firestore.collection('dms')
            .add(this.DM.toJSON())
            .then((docRef) => {
              const chatId = docRef.id;
              console.log('Neuer Chat erstellt. Chat-ID:', chatId);
              this.updateUsers(this.DM.members, chatId);
              this.closeDialog()
              this.openChat(chatId)

            })
        }
      })
  }



  updateUsers(members: any[], docID: string) {
    const uniqueMembers = new Set(members.map(member => member.id));
    uniqueMembers.forEach((element: string) => { // Element-Typ auf "string" festlegen
      this.firestore
        .collection('users')
        .doc(element)
        .collection('dmsFromUser')
        .add({
          DMID: docID
        })
    });
  }

  openChat(id) {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        viewChat: true,
        currentDM: id
      })
  }

}

