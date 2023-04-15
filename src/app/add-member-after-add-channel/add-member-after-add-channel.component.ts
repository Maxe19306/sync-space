import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-add-member-after-add-channel',
  templateUrl: './add-member-after-add-channel.component.html',
  styleUrls: ['./add-member-after-add-channel.component.scss']
})
export class AddMemberAfterAddChannelComponent implements OnInit {


  Channel: Channel = new Channel({});
  @Inject(MAT_DIALOG_DATA) public data:any
  constructor() { }
    certainPeople = false;

  ngOnInit() {

  }


}
