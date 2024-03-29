import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { currentUser } from '../models/currentUser.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DirectMessage } from '../models/dm.class';
import { MembersViewComponent } from '../members-view/members-view.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {

  mobileBreakpointGeneral: number;
  DM: DirectMessage = new DirectMessage({});

  constructor(
    public dialogRef: MatDialogRef<ProfileViewComponent>,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dataService: DataService,
    public sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  selectedProfileImage;
  profileImages = ['./assets/img/users2/user-female-00.webp', './assets/img/users2/user-female-01.webp', './assets/img/users2/user-male-00.webp', './assets/img/users2/user-male-01.webp', './assets/img/users2/user-male-02.webp', './assets/img/users2/user-male-03.webp', './assets/img/users2/user-neutral-bw.webp','./assets/img/users2/user-neutral.webp']
  userDetail;
  currentUser;
  editMode = false;
  @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef;

  ngOnInit(): void {
    this.loadUserDetail();
    this.loadCurrentUser();
    this.getMobileBreakpointGeneral();
  }

  getMobileBreakpointGeneral() {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--mobile-breakpoint-general').trim();
    this.mobileBreakpointGeneral = parseInt(value, 10);
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

  updateImage(image) {
    this.selectedProfileImage = image;
  }

  isImageSelected(image: string): boolean {
    return this.selectedProfileImage === image;
  }

  closeDialog() {
    this.dialogRef.close(ProfileViewComponent);
    if (window.innerWidth <= this.mobileBreakpointGeneral) {
      this.closeProfileBottomSheet();
    }
  }

  closeProfileBottomSheet() {
    this.sharedService.closeSheet();
  }

  async initiateUserEditMode() {
    this.editMode = true;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.userNameInput.nativeElement.focus();
  }

  overwriteUserDataBackend() {
    if (this.selectedProfileImage) {
      this.firestore
        .collection('users')
        .doc(this.data.userId)
        .update({
          name: this.userDetail.name,
          profileImage: this.selectedProfileImage
        })
    }
    this.firestore
      .collection('users')
      .doc(this.data.userId)
      .update({
        name: this.userDetail.name,
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
      this.hideSecondaryChat();
  }

  hideSecondaryChat() {
    const secondaryChat = document.getElementsByTagName("app-secondary-chat")[0] as HTMLElement;
    if (secondaryChat) {
      secondaryChat.style.display = "none";
      secondaryChat.style.width= "auto";
      secondaryChat.style.marginLeft = 25 + "px";
      secondaryChat.style.backgroundColor = "white";
    }
  }
}

