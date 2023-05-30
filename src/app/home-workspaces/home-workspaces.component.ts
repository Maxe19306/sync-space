import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home-workspaces',
  templateUrl: './home-workspaces.component.html',
  styleUrls: ['./home-workspaces.component.scss']
})
export class HomeWorkspacesComponent implements OnInit {
  @ViewChild('logoContainer') logoContainer: ElementRef;
  @ViewChild('logoDefault') logoDefault: ElementRef;
  @ViewChild('logoHover') logoHover: ElementRef;

  constructor(private sharedService: SharedService) { }

  toggleMenuSidebarLeft() {
    this.sharedService.toggleMenuSidebarLeft();
  }

  ngOnInit(): void {

    console.log("logoDefault", this.logoDefault);
  }

  highlightLogo() {
    this.logoDefault.nativeElement.style.display = "none"
    this.logoHover.nativeElement.style.display = "block";
  }

  unHighlightLogo() {
    this.logoHover.nativeElement.style.display = "none"
    this.logoDefault.nativeElement.style.display = "block";
  }
}
