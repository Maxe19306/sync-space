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

}
