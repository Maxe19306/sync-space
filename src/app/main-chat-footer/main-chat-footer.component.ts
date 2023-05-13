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

  chatForm;
  chatTextarea;
  sendBtn;

  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.chatForm = <HTMLFormElement>document.getElementById("chatForm");
    this.chatTextarea = <HTMLTextAreaElement>document.getElementById("chatTextarea");
    this.sendBtn = <HTMLDivElement>document.getElementById("sendBtn");

        // for (let i = 0; i < tx.length; i++) {
    //   tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    //   tx[i].addEventListener("input", OnInput, false);
    // }

    // function OnInput() {
    //   this.style.height = 0;
    //   this.style.height = (this.scrollHeight) + "px";
    // }

    this.loadCurrentUser();
    this.textareaInput();
    this.textareaEnter();
  }

  textareaInput() {
    const self = this;
    this.chatTextarea.addEventListener('input', function (e) {
      self.checkIfTextareaHasValue();
    });
  }

  textareaEnter() {
    const self = this;
    this.chatTextarea.addEventListener('keydown', function (e) {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        const value = self.chatTextarea.value.trim();
        if (value !== '') {
          self.sendMessage();
        }
      }
    });
  }

  checkIfTextareaHasValue() {
    if (this.chatTextareaHasValue()) {
      this.sendBtn.classList.remove("send__img__disabled");
      this.chatForm.classList.add("form__active");
    }
    else {
      this.sendBtn.classList.add("send__img__disabled");
      this.chatForm.classList.remove("form__active");
    }
  }

  chatTextareaHasValue() {
    return this.chatTextarea.value.length != 0;
  }

  sendMessage() {
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('channels')
      .doc(this.currentUser.lastChannel)
      .collection('messages')
      .add(this.message.toJSON());
    this.resetForm();
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
    this.chatTextarea.focus();
  }

  resetForm() {
    this.chatTextarea.value = '';
    this.chatTextarea.length = 0;
    this.sendBtn.classList.add("send__img__disabled");
    this.chatForm.classList.remove("form__active");
  }

}
