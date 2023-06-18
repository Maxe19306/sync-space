import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/message.class';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-main-direct-message-footer',
  templateUrl: './main-direct-message-footer.component.html',
  styleUrls: ['./main-direct-message-footer.component.scss']
})
export class MainDirectMessageFooterComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  currentUser
  message: Message = new Message({})
  isUploadEnabled = false;
  chatFormSecondary;
  chatTextareaSecondary;
  sendBtnSecondary;
  ImageToBeUpload;
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
          self.sendDM();
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

  sendDM() {
    if(this.isUploadEnabled){
        this.uploadImage()
    }
    this.message.image = this.ImageToBeUpload.target.files[0].name
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    this.firestore
      .collection('dms')
      .doc(this.currentUser.currentDM)
      .collection('messages')
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
    this.sendBtnSecondary.classList.add("send__img__disabled");
    this.chatFormSecondary.classList.remove("form__active");
  }

  test(event){
    this.ImageToBeUpload = event;
    console.log(this.ImageToBeUpload.target.files[0])
 }


  // öffnet die bilder zum hochladen
  openImageUploader() {
    this.fileInput.nativeElement.click();
  }


  uploadImage() {
    const file = this.ImageToBeUpload.target.files[0];
    const filePath =  file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Verarbeite den Upload-Task hier...
    task.snapshotChanges().subscribe(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
        // Hier ist die herunterladbare URL des hochgeladenen Bildes
        console.log('Download-URL:', downloadURL);
});
    });
  }
}


