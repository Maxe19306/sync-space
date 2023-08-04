import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main-chat-footer',
  templateUrl: './main-chat-footer.component.html',
  styleUrls: ['./main-chat-footer.component.scss']
})

export class MainChatFooterComponent implements OnInit {

  toggled: boolean = false;

  currentUser
  message: Message = new Message({})
  @Input() channelName;
  chatForm;
  chatTextarea;
  sendBtn;

  constructor(public dataService: DataService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.chatForm = <HTMLFormElement>document.getElementById("chatForm");
    this.chatTextarea = <HTMLTextAreaElement>document.getElementById("chatTextarea");
    this.sendBtn = <HTMLDivElement>document.getElementById("sendBtn");

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

  styleEmojiPicker() {
    const emojiPicker = document.getElementsByTagName('emoji-picker')[0] as HTMLElement;
    setTimeout(() => {
      emojiPicker.style.top = "0";
    }, 500);
  }

  handleSelection(event) {
    console.log(event.char);
    const emojiPicker = document.getElementsByTagName('emoji-picker')[0] as HTMLElement;
    setTimeout(() => {
      emojiPicker.style.top = "0";
    }, 500);
    if (!this.message.text) {
      this.message.text = '';
    }
    this.message.text += event.char;
    emojiPicker.style.display = "none";
    this.toggled = false;
  }
}
