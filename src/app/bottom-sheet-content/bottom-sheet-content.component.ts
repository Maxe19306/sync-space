import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DataService } from '../data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss']
})

export class BottomSheetContentComponent implements OnInit {

  currentUser;
  @Input() userId: any;
  isDialogOpen = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetContentComponent>,
    private router: Router,
    public dataService: DataService,
    public sharedService: SharedService,
    public Dialog: MatDialog) {
    this.sharedService.closeSheet$.subscribe(() => {
      this.closeSheet();
    });
  }

  ngOnInit(): void {
  }

  closeSheet(): void {
    this.bottomSheetRef.dismiss();
  }

  openDialogProfil(userId, event: Event) {
    event.stopPropagation();
    this.isDialogOpen = true;
    const dialogRef = this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  logout(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/']);
    this.closeSheet();
  }
}
