import { Component, OnInit } from '@angular/core';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-channels-menu',
  templateUrl: './channels-menu.component.html',
  styleUrls: ['./channels-menu.component.scss']
})
export class ChannelsMenuComponent implements OnInit {

  constructor(
    public Dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openCreateNewChannelDialog(){
    this.Dialog.open(CreateChannelComponent)
  }

}
