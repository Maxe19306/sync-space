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
    
  selectedProfileImage;
  profileImages =['./assets/img/users2/user-female-00.webp','./assets/img/users2/user-female-01.webp','./assets/img/users2/user-male-00.webp','./assets/img/users2/user-male-01.webp','./assets/img/users2/user-male-02.webp','./assets/img/users2/user-male-03.webp','./assets/img/users2/user-neutral-bw.webp']
  userDetail;
  currentUser;
  editMode = false;
  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;
  @ViewChild('userMailInput', { static: false }) userMailInput: ElementRef;

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

  updateImage(image){
    this.selectedProfileImage = image;
  }
  
  
  closeDialog() {
    this.dialogRef.close(ProfileViewComponent)
  }

  async initiateUserEditMode() {
    this.editMode = true;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.userNameInput.nativeElement.focus();
  }

  overwriteUserDataBackend() {
    if(this.selectedProfileImage) {
      this.firestore
        .collection('users')
        .doc(this.data.userId)
        .update({
      name: this.userDetail.name,
      mail: this.userDetail.mail,
      profileImage : this.selectedProfileImage
    }) 
    }
    this.firestore
    .collection('users')
    .doc(this.data.userId)
    .update({
      name: this.userDetail.name,
      mail: this.userDetail.mail,
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

