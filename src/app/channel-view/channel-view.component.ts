import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss']
})
export class ChannelViewComponent implements OnInit {
  


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private firestore: AngularFirestore) { }
  CurrentChannel;
  editName = false;
  editDescription = false;

  ngOnInit(): void {
    this.firestore
    .collection('channels')
    .doc(this.data.ChannelId)
    .valueChanges()
    .subscribe((channel) => {
      this.CurrentChannel = channel
      console.log(this.CurrentChannel)
    });
  }

  editDescriptionName(){
    this.editDescription = true;
  }

  editDescriptionInFirebase(){
    this.firestore
    .collection('channels')
    .doc(this.data.ChannelId)
    .update({
      description: this.CurrentChannel.description
    })
    this.editDescription = false;
}


  editChannelName(){
    this.editName = true;
  }

  editChannelNameInFirebase(){
      this.firestore
      .collection('channels')
      .doc(this.data.ChannelId)
      .update({
        Name: this.CurrentChannel.Name
      })
      this.editName = false;
  }

}
