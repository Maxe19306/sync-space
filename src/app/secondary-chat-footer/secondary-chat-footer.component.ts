import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-secondary-chat-footer',
  templateUrl: './secondary-chat-footer.component.html',
  styleUrls: ['./secondary-chat-footer.component.scss']
})

export class SecondaryChatFooterComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  toggled: boolean = false;
  isUploadEnabled = false;
  imageToBeUpload;
  currentUser
  message: Message = new Message({})
  currentMessage;
  chatFormSecondary;
  chatTextareaSecondary;
  sendBtnSecondary;

  constructor(public dataService: DataService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

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
    if(this.isUploadEnabled){
      this.uploadImage()
      this.message.image = this.imageToBeUpload.target.files[0].name
  }  
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('channels')
      .doc(this.currentUser.channelFromThread)
      .collection('messages')
      .doc(this.currentUser.threadId)
      .collection('threadAnswer')
      .add(this.message.toJSON());
    this.updateMessageInfo()
    this.resetFormSecondary();
  }

  updateMessageInfo(){
    this.firestore
    .collection('channels')
    .doc(this.currentUser.channelFromThread)
    .collection('messages')
    .doc(this.currentUser.threadId)
    .update({
      lastAnswer: new Date().getTime(),
      answer : this.currentMessage.answer + 1
    })
  }
  
  
  loadCurrentUser() {
    this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({ idField: 'id' })
      .subscribe((user) => {
        this.currentUser = user; 
        this.loadCurrentMessage()
      })
  }
  
  loadCurrentMessage(){
    this.firestore
      .collection('channels')
      .doc(this.currentUser.channelFromThread)
      .collection('messages')
      .doc(this.currentUser.threadId)
      .valueChanges({ idField: 'messageID' })
      .subscribe((message) => {
          this.currentMessage = message
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
  
  openImageUploader() {
    this.fileInput.nativeElement.click();
  }
  
  uploadImage() {
    const file = this.imageToBeUpload.target.files[0];
    const filePath =  file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Verarbeite den Upload-Task hier...
    task.snapshotChanges().subscribe(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
        // Hier ist die herunterladbare URL des hochgeladenen Bildes
});
    });
  }
  
  readyUploadImage(event){
    this.imageToBeUpload = event;
    }

  // handleSelection(event) {
  //   const emojiPicker = document.getElementsByTagName('emoji-picker')[0] as HTMLElement;
  //   if (!this.message.text) {
  //     this.message.text = '';
  //   }
  //   this.message.text += event.char;
  //   emojiPicker.style.display = "none";
  //   this.toggled = false;
  //   this.sendBtnSecondary.classList.remove("send__img__disabled");
  //   this.chatFormSecondary.classList.add("form__active");
  // }
}