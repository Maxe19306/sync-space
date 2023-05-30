import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-workspaces',
  templateUrl: './home-workspaces.component.html',
  styleUrls: ['./home-workspaces.component.scss']
})
export class HomeWorkspacesComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  toggleMenuSidebarLeft() {
    this.sharedService.toggleMenuSidebarLeft();
  }

  ngOnInit(): void {

    const test = document.getElementById("test");
  }

}
