import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetContentComponent } from '../bottom-sheet-content/bottom-sheet-content.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})

export class ProfileMenuComponent implements OnInit {

  mobileBreakpointGeneral: number;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger
  @Input() userId: any;
  currentUser;
  
  constructor(
    public Dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.getMobileBreakpointGeneral();
    this.loadCurrentUser();
  }

  getMobileBreakpointGeneral() {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--mobile-breakpoint-general').trim();
    this.mobileBreakpointGeneral = parseInt(value, 10);
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user

      });
  }

  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
  }

  openProfileView() {
    if (window.innerWidth <= this.mobileBreakpointGeneral) {
      this.openBottomSheet();
    } else {
      this.overlay.nativeElement.style.display = 'flex';
    }
    // this.overlay.nativeElement.style.display = 'flex';
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetContentComponent);
  }

  closeProfileView() {
    this.overlay.nativeElement.style.display = 'none';
  }

  logout() {
    this.router.navigate(['/']);
  }
}