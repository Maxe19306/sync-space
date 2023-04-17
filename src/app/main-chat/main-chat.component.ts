import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
  providers: [DataService],
})
export class MainChatComponent implements OnInit {

  constructor(
    private dataService : DataService,
    public Dialog: MatDialog,
  ) { }

  ngOnInit(): void {
      console.log(this.dataService.id)
  }


  openDialogChannelView(){
    this.Dialog.open(ChannelViewComponent)
    console.log(this.dataService.id)
}
}
