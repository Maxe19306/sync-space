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
  personalDm
  allDmsIDFromUser;
  allDmsFromUser = [];
  currentUser
  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadAllDms()
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    this.firestore
    .collection('users')
    .doc(this.dataService.id)
    .valueChanges({idField: 'id'})
    .subscribe((user) => {
      this.currentUser = user;
    })
  }

    loadAllDms(){
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

  determinePersonalChat(){
  this.allDmsFromUser.forEach(element => {
    const member1 = element.members[0]
    const member2 = element.members[1]

    if(member1.id === member2.id){
      this.personalDm = element
    }


  });
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
            this.determinePersonalChat()
          }
        });
    });
    
  }

  openChat(id){
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        viewChat: true,
        currentDM: id
      })
  }

}
