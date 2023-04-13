import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMemberAfterAddChannelComponent } from '../add-member-after-add-channel/add-member-after-add-channel.component';


@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor(public Dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateChannelComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(CreateChannelComponent)
  }


  createChannel(){
    this.Dialog.open(AddMemberAfterAddChannelComponent)

    this.dialogRef.close(CreateChannelComponent)
}

}
