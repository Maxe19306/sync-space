import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMemberAfterAddChannelComponent } from '../add-member-after-add-channel/add-member-after-add-channel.component';
import { Channel } from '../models/channel.class';


@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  @ViewChild('channelName', { static: true }) channelNameInput: ElementRef<HTMLInputElement>;

  channel: Channel = new Channel({});
  constructor(

    public Dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateChannelComponent>,
  ) { }

  ngOnInit(): void {








    // this.Dialog.open(AddMemberAfterAddChannelComponent, {
    //   // data: channel
    //   panelClass: 'new__channel__matdialog__adduser'
    // })











  }

  closeDialog() {
    this.dialogRef.close(CreateChannelComponent)
  }

  focusChannelNameInput() {
    this.channelNameInput.nativeElement.focus();
  }

  createChannel(channel) {

    this.Dialog.open(AddMemberAfterAddChannelComponent, {
      data: channel,
      panelClass: 'new__channel__matdialog__adduser'
    })

    this.dialogRef.close(CreateChannelComponent)
  }

}
