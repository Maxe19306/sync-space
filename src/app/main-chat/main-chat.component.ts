import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelViewComponent } from '../channel-view/channel-view.component';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {

  constructor(
    public Dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  openDialogChannelView(){
    this.Dialog.open(ChannelViewComponent)
}
}
