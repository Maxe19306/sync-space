import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss']
})
export class BottomSheetContentComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetContentComponent>) { }

  ngOnInit(): void {
  }

  closeSheet(): void {
    this.bottomSheetRef.dismiss();
  }

}
