import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-secondary-chat-footer',
  templateUrl: './secondary-chat-footer.component.html',
  styleUrls: ['./secondary-chat-footer.component.scss']
})
export class SecondaryChatFooterComponent implements OnInit {
    currentUser
  message: Message = new Message({})
  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const chatFormSecondary = document.getElementById("chatFormSecondary");
    const chatTextareaSecondary = document.getElementById("chatTextareaSecondary");
    const tx = document.getElementsByTagName("textarea");

    this.textAreaEnter(chatTextareaSecondary);
    this.changeSendButtonStyleSecondary();

    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 0;
      this.style.height = (this.scrollHeight) + "px";
    }

    this.loadCurrentUser()
    this.chatFormSecondaryBorderColorInput(chatFormSecondary, chatTextareaSecondary);
  }

  sendMessageSecondary() {
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('channels')
      .doc(this.currentUser.ChannelFromThread)
      .collection('messages')
      .doc(this.currentUser.ThreadID)
      .collection('threadAnswer')
      .add(this.message.toJSON())
    this.message.text = '';
  }

  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user;
      })
  }

  focusTextareaSecondary() {
    document.getElementById("chatTextareaSecondary").focus();
  }

  chatFormSecondaryBorderColorInput(chatFormSecondary, chatTextareaSecondary) {
    chatTextareaSecondary.addEventListener("input", (event) => {
      const chatTextareaSecondary = <HTMLInputElement>document.getElementById("chatTextareaSecondary");
      if (chatTextareaSecondary.value.length > 0) chatFormSecondary.classList.add("form__active");
      else chatFormSecondary.classList.remove("form__active");
    });
  }

  textAreaEnter(chatTextareaSecondary) {
    const self = this;
    chatTextareaSecondary.addEventListener('keydown', function (e) {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (chatTextareaSecondary.value.length != 0) {
          self.sendMessageSecondary();
          chatTextareaSecondary.value = '';
        }
      }
    });
  }

  changeSendButtonStyleSecondary() {
    const chatTextareaSecondary = <HTMLInputElement>document.getElementById("chatTextareaSecondary");
    const sendButton = document.getElementById("sendImgBtnSecondary");

    chatTextareaSecondary.addEventListener('keydown', function (e) {
      sendButton.classList.remove("send__img__disabled");
      const keyCode = e.which || e.keyCode;
      if (keyCode === 8 && !e.shiftKey && chatTextareaSecondary.value.length == 0) {
        sendButton.classList.add("send__img__disabled");
      }
    });
  }

}
