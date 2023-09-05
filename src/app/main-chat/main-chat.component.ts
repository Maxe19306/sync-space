import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelViewComponent } from '../channel-view/channel-view.component';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MembersViewComponent } from '../members-view/members-view.component';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})

export class MainChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  updateMembers = [];
  currentChannel;
  currentUser
  constructor(
    public dataService: DataService,
    public Dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
    // this.scrollDownAfterPageLoad();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  openDialogChannelView(channelId) {
    this.Dialog.open(ChannelViewComponent, {
      data: { channelId },
      panelClass: 'channel__view__matdialog'
    })
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user;
        this.loadLastChannel()
      })
  }

  loadLastChannel() {
    this.firestore
      .collection('channels')
      .doc(this.currentUser.lastChannel)
      .valueChanges({ idField: 'id' })
      .subscribe((channel) => {
        this.currentChannel = channel
        this.getCurrentInfoOfTheUsers()
      })
  }
  
 get limitedMembers(): any[] {
    
    const maxCount = 3;
    return this.updateMembers.slice(0, maxCount);
  }
  

  
  getCurrentInfoOfTheUsers() {
    this.updateMembers = [];
    this.currentChannel.members.forEach(member => {
      this.firestore
        .collection('users')
        .doc(member.id)
        .valueChanges({idField: 'id'})
        .subscribe((memberInfo) => {
          // Überprüfe, ob die Informationen bereits in der Liste sind
          const index = this.updateMembers.findIndex(existingMember => existingMember.id === memberInfo.id);
  
          if (index === -1) {
            this.updateMembers.push(memberInfo); // Speichere die aktualisierten Informationen
          }
        });
    });
  }
  
  
  openDialogMembersView(members, test) {
    const channelId = this.currentUser.lastChannel
    this.Dialog.open(MembersViewComponent,
      {
        data: { members, channelId, test},
        panelClass: 'members__view__matdialog'
      })
  }

  // scrollDownAfterPageLoad() {
  //   document.addEventListener('DOMContentLoaded', function () {
  //     let mainChatBody = document.getElementById("mainChatBody");
  //     mainChatBody.scrollTop = mainChatBody.scrollHeight;
  //   }, false);
  // }
}
