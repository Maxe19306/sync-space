import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-main-chat-footer',
  templateUrl: './main-chat-footer.component.html',
  styleUrls: ['./main-chat-footer.component.scss']
})
export class MainChatFooterComponent implements OnInit {
  currentUser
  message: Message = new Message({})
  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    const chatForm = document.getElementById("chatForm");
    const chatTextarea = document.getElementById("chatTextarea");
    const tx = document.getElementsByTagName("textarea");

    this.textAreaEnter(chatTextarea);

    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 0;
      this.style.height = (this.scrollHeight) + "px";
    }

    this.loadCurrentUser()
    this.chatFormBorderColorInput(chatForm, chatTextarea);
  }

  sendMessage() {
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('channels')
      .doc(this.currentUser.lastChannel)
      .collection('messages')
      .add(this.message.toJSON())
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

  focusTextarea() {
    document.getElementById("chatTextarea").focus();
  }

  chatFormBorderColorInput(chatForm, chatTextarea) {
    chatTextarea.addEventListener("input", (event) => {
      const chatTextarea = <HTMLInputElement>document.getElementById("chatTextarea");
      if (chatTextarea.value.length > 0) chatForm.classList.add("form__active");
      else chatForm.classList.remove("form__active");
    });
  }

  textAreaEnter(chatTextarea) {
    const self = this;

    chatTextarea.addEventListener('keydown', function (e) {
      self.changeSendButtonStyle(chatTextarea);
      const keyCode = e.which || e.keyCode;

      if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();

        if (chatTextarea.value.length != 0) {
          self.sendMessage();
          chatTextarea.value = '';
        }

      }
    });
  }

  changeSendButtonStyle(chatTextarea) { //additional keyUP eventlistener
    const sendButton = document.getElementsByTagName("sendImgBtn")[0] as HTMLDivElement;
    if (chatTextarea.value.length > 0) {
      sendButton.classList.remove("send__img__disabled");
    }
    if (chatTextarea.value.length = 0) {
      sendButton.classList.add("send__img__disabled");
    }
  }

}
