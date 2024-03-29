import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  allUsers;
  allChannels;
  filteredUsers = [];
  filteredChannels = [];
  inputParticipants
  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore,
    public Dialog: MatDialog,
    private _eref: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const clickedInside = this._eref.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.hideResultRows();
    }
  }

  hideResultRows(): void {
    this.filteredChannels = [];
    this.filteredUsers = [];
}

  ngOnInit(): void {
    this.loadAllUsers()
    this.loadAllChannels()
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");

    searchInput.addEventListener("input", (event) => {
      const searchInput = <HTMLInputElement>document.getElementById("searchInput");
      if (searchInput.value.length > 0) searchIcon.style.display = 'none';
      else searchIcon.style.display = 'inline-block';
    });
  }

  loadAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((channels: any) => {
        this.allChannels = channels
      })
  }

  loadAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((user: any) => {
        this.allUsers = user
      })
  }

  Search() {
    if (this.inputParticipants === '') {
      this.filteredUsers = [];
      this.filteredChannels = [];
      return;
    }

    this.filteredUsers = this.allUsers.filter(user =>
      user.name
        .toLowerCase()
        .includes(this.inputParticipants.toLowerCase())
    );

    this.filteredChannels = this.allChannels.filter(channel =>
      channel.name
        .toLowerCase()
        .includes(this.inputParticipants.toLowerCase())
    );
  }

  openDialogProfil(userId) {
    this.Dialog.open(ProfileViewComponent, {
      data: { userId },
      panelClass: 'profile__view__matdialog'
    })
    this.filteredUsers = [];
    this.filteredChannels = [];
  }

  updateUserInFirbase(channelId) {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .update({
        lastChannel: channelId
      })
    this.filteredUsers = [];
    this.filteredChannels = [];
  }
}
