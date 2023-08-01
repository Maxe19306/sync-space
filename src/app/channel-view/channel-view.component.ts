import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss']
})

export class ChannelViewComponent implements OnInit {

  @ViewChild('channelNameInput') channelNameInput: ElementRef;

  constructor(
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore,
    public Dialog: MatDialog,
    public dialogRef: MatDialogRef<ChannelViewComponent>
  ) { }

  currentUser;
  currentChannel;
  editName = false;
  editDescription = false;

  ngOnInit(): void {
    this.loadChannel()
    this.loadCurrentUser()
  }

  closeDialog() {
    this.dialogRef.close(ChannelViewComponent)
  }

  loadChannel() {
    this.firestore
      .collection('channels')
      .doc(this.data.channelId)
      .valueChanges()
      .subscribe((channel) => {
        this.currentChannel = channel
      });
  }

  editDescriptionName() {
    this.editDescription = true;
  }

  editDescriptionInFirebase() {
    this.firestore
      .collection('channels')
      .doc(this.data.ChannelId)
      .update({
        description: this.currentChannel.description
      })
    this.editDescription = false;
  }

  editChannelName() {
    // this.editName = true;
    this.channelNameInput.nativeElement.focus();
  }

  editChannelNameInFirebase() {
    this.firestore
      .collection('channels')
      .doc(this.data.channelId)
      .update({
        name: this.currentChannel.name
      })
    this.editName = false;
  }

  leaveChannel() {
    const currentUserIndex = this.currentChannel.members.findIndex(member => member.id === this.currentUser.id)
    this.currentChannel.members.splice(currentUserIndex, 1);
    this.firestore
      .collection('channels')
      .doc(this.data.channelId)
      .update({
        members: this.currentChannel.members
      })
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


}
