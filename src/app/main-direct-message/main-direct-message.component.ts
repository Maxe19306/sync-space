import { Component, OnInit } from '@angular/core';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-main-direct-message',
  templateUrl: './main-direct-message.component.html',
  styleUrls: ['./main-direct-message.component.scss']
})

export class MainDirectMessageComponent implements OnInit {

  currentUser;
  lastDm;
  speaker;

  constructor(
    public dataService: DataService,
    public Dialog: MatDialog,
    private firestore: AngularFirestore,
    private speakerService: SpeakerService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user;
        this.loadLastDm()
      })
  }

  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
  }

  loadLastDm() {
    this.firestore
      .collection('dms')
      .doc(this.currentUser.currentDM)
      .valueChanges({ idField: 'id' })
      .subscribe((dm) => {
        this.lastDm = dm;
        this.IdentifySpeaker()
      })
  }

  IdentifySpeaker() {
    const member1 = this.lastDm.members[0]
    const member2 = this.lastDm.members[1]

    if (member1.id === member2.id) {
      this.speaker = member1;
    }
    else if (member2.id === this.dataService.id) {
      this.speaker = member1
    }
    else (
      this.speaker = member2     
    )
    this.loadSpeaker()
  }
  
  
  
  loadSpeaker(){
    this.firestore
      .collection('users')
      .doc(this.speaker.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.speaker = user;
      })
  }

  changeSpeaker(newSpeaker) {
    this.speaker = newSpeaker;
    this.speakerService.changeSpeaker(this.speaker);
  }
}


