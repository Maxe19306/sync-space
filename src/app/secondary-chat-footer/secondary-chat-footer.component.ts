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

  toggled: boolean = false;

  currentUser
  message: Message = new Message({})

  chatFormSecondary;
  chatTextareaSecondary;
  sendBtnSecondary;

  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.chatFormSecondary = <HTMLFormElement>document.getElementById("chatFormSecondary");
    this.chatTextareaSecondary = <HTMLTextAreaElement>document.getElementById("chatTextareaSecondary");
    this.sendBtnSecondary = <HTMLDivElement>document.getElementById("sendBtnSecondary");

    this.loadCurrentUser();
    this.textareaInputSecondary();
    this.textareaEnterSecondary();
  }

  textareaInputSecondary() {
    const self = this;
    this.chatTextareaSecondary.addEventListener('input', function (e) {
      self.checkIfTextareaSecondaryHasValue();
    });
  }

  textareaEnterSecondary() {
    const self = this;
    this.chatTextareaSecondary.addEventListener('keydown', function (e) {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        const value = self.chatTextareaSecondary.value.trim();
        if (value !== '') {
          self.sendMessageSecondary();
        }
      }
    });
  }

  checkIfTextareaSecondaryHasValue() {
    if (this.chatTextareaSecondaryHasValue()) {
      this.sendBtnSecondary.classList.remove("send__img__disabled");
      this.chatFormSecondary.classList.add("form__active");
    }
    else {
      this.sendBtnSecondary.classList.add("send__img__disabled");
      this.chatFormSecondary.classList.remove("form__active");
    }
  }

  chatTextareaSecondaryHasValue() {
    return this.chatTextareaSecondary.value.length != 0;
  }

  sendMessageSecondary() {
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('channels')
      .doc(this.currentUser.channelFromThread)
      .collection('messages')
      .doc(this.currentUser.threadId)
      .collection('threadAnswer')
      .add(this.message.toJSON());
    this.resetFormSecondary();
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
    this.chatTextareaSecondary.focus();
  }

  resetFormSecondary() {
    this.chatTextareaSecondary.value = '';
    this.chatTextareaSecondary.length = 0;
    this.message.text = '';
    this.sendBtnSecondary.classList.add("send__img__disabled");
    this.chatFormSecondary.classList.remove("form__active");
  }

  handleSelection(event) {
    const emojiPicker = document.getElementsByTagName('emoji-picker')[0] as HTMLElement;
    if (!this.message.text) {
      this.message.text = '';
    }
    this.message.text += event.char;
    emojiPicker.style.display = "none";
    this.toggled = false;
    this.sendBtnSecondary.classList.remove("send__img__disabled");
    this.chatFormSecondary.classList.add("form__active");
  }
}