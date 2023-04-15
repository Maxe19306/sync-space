import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMemberAfterAddChannelComponent } from '../add-member-after-add-channel/add-member-after-add-channel.component';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  Channel: Channel = new Channel({});

  constructor(public Dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateChannelComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(CreateChannelComponent)
  }


  createChannel(){
   
    console.log(this.Channel)
    this.Dialog.open(AddMemberAfterAddChannelComponent, {
      data: this.Channel
    })
   this.dialogRef.close(CreateChannelComponent)
}

}
