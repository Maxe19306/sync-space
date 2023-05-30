import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main-direct-message',
  templateUrl: './main-direct-message.component.html',
  styleUrls: ['./main-direct-message.component.scss']
})
export class MainDirectMessageComponent implements OnInit {
  currentUser;
  lastDM
  constructor(
     public dataService: DataService,
    public Dialog: MatDialog,
    private firestore: AngularFirestore) {
   
   }

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

  
  loadLastDm(){
          this.firestore
        .collection('dms')
        .doc(this.currentUser.currentDM)
        .valueChanges({ idField: 'id' })
        .subscribe((dm) => {
          this.lastDM = dm
        })
    }
  }


