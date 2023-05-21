import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dm-menu',
  templateUrl: './dm-menu.component.html',
  styleUrls: ['./dm-menu.component.scss']
})
export class DmMenuComponent implements OnInit {
  viewChannels = false;
  allDmsIDFromUser;
  allDmsFromUser = [];
  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .collection('dmsFromUser')
    .valueChanges({idField: 'id'})
    .subscribe((dm)=> {
      this.allDmsIDFromUser = dm
      this.loadAllChats()
    }
    )
  }

  viewNoChannels(){
    this.viewChannels = false;
  }

  viewAllDMS(){
    if(!this.viewChannels){
      this.viewChannels = true;
    }
    else {
      this.dmSlideUpClass();
      setTimeout(() => {
        this.viewChannels = false;
      }, 100);
    }
  }

  dmSlideUpClass() {
    const dmChannelsBody = document.getElementById("dmChannelsBody") as HTMLDivElement;
    dmChannelsBody.classList.remove("drop__drown__animation");
    dmChannelsBody.classList.add("slide__up__animation");
  }

  loadAllChats() {
    this.allDmsIDFromUser.forEach(dm => {
      this.firestore
        .collection('dms')
        .doc(dm.DMID)
        .valueChanges({idField: 'DmId'})
        .subscribe(dmData => {
          // Überprüfen, ob der Chat bereits in allDmsFromUser existiert
          const existingDm = this.allDmsFromUser.find(d => d.DmId === dmData.DmId);
          if (!existingDm) {
            this.allDmsFromUser.push(dmData);
          }
          console.log(this.allDmsFromUser);
        });
    });
  }

  openChat(id){
console.log(id)
  }

}
