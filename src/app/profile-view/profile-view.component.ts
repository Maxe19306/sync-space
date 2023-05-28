import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { currentUser } from '../models/currentUser.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DirectMessage } from '../models/dm.class';
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
    public dialog : MatDialog,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }


    UserDetail;
    CurrentUser;

  ngOnInit(): void {
    this.loadUserDetail()
    this.loadCurrentUser()
  }

 loadUserDetail() {
  this.firestore
  .collection('users')
  .doc(this.data.userID)
  .valueChanges({idField: 'id'})
  .subscribe((user) => {
    this.UserDetail = user
  });
  }

  loadCurrentUser() {
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .valueChanges({idField: 'id'})
    .subscribe((user) => {
      this.CurrentUser = user
    });
    }


  closeDialog(){
    this.dialogRef.close(ProfileViewComponent)
  }

  createDM() {
    const currentUser = {
      name: this.CurrentUser.Name,
      id: this.CurrentUser.id
    };
  
    const userDetail = {
      name: this.UserDetail.Name,
      id: this.UserDetail.id
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
            })
            .catch((error) => {
              console.error('Fehler beim Erstellen des DM:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abfragen des Chats:', error);
      });
  }
  


  updateUsers(members: any[], docID: string){
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

}

     