import { Component, OnInit } from '@angular/core';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-sidebar-left',
  templateUrl: './menu-sidebar-left.component.html',
  styleUrls: ['./menu-sidebar-left.component.scss']
})
export class MenuSidebarLeftComponent implements OnInit {

  constructor(
    public Dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openCreateNewChannelDialog(){
    this.Dialog.open(CreateChannelComponent)
  }

}
