import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dm-menu',
  templateUrl: './dm-menu.component.html',
  styleUrls: ['./dm-menu.component.scss']
})
export class DmMenuComponent implements OnInit {
  viewChannels = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewNoChannels(){
    this.viewChannels = false;
  }

  viewAllChannels(){
    if(!this.viewChannels){
      this.viewChannels = true;
    }
    else(this.viewChannels = false)
  }

}
