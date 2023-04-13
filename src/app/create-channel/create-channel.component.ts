import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateChannelComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(CreateChannelComponent)
  }

}
