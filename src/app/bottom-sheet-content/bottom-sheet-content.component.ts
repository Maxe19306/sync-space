import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss']
})
export class BottomSheetContentComponent implements OnInit {

  currentUser;
  @Input() userId: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetContentComponent>,
              private router: Router,
              private firestore: AngularFirestore,
              public Dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  closeSheet(): void {
    this.bottomSheetRef.dismiss();
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

  logout() {
    this.router.navigate(['/']);
  }
}
