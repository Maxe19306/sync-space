import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Message } from '../models/message.class';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ChatService } from '../shared.service';

@Component({
  selector: 'app-main-chat-footer',
  templateUrl: './main-chat-footer.component.html',
  styleUrls: ['./main-chat-footer.component.scss']
})

export class MainChatFooterComponent implements OnInit {

  @ViewChild('myTextarea') myTextarea: ElementRef;

  @ViewChild('fileInput') fileInput: any;
  toggled: boolean = false;
  isUploadEnabled = false;
  currentUser;
  imageToBeUpload;
  message: Message = new Message({})
  @Input() channelName;
  chatForm;
  chatTextarea;
  sendBtn;

  constructor(public dataService: DataService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private renderer: Renderer2,
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatForm = <HTMLFormElement>document.getElementById("chatForm");
    this.chatTextarea = <HTMLTextAreaElement>document.getElementById("chatTextarea");
    this.sendBtn = <HTMLDivElement>document.getElementById("sendBtn");

    this.loadCurrentUser();
    this.textareaInput();
    this.textareaEnter();

    this.chatService.focusOnTextareaEvent.subscribe(() => {
      this.renderer.selectRootElement(this.myTextarea.nativeElement).focus();
    });
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
    if(this.isUploadEnabled){
        this.uploadImage()
        this.message.image = this.imageToBeUpload.target.files[0].name
    }  
    this.message.creator = this.currentUser;
    this.message.timestamp = new Date().getTime();
    
    this.firestore
    .collection('channels')
    .doc(this.currentUser.lastChannel)
    .collection('messages')
    .add(this.message.toJSON());
    this.resetForm()
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
    this.message.text = '';
    this.sendBtn.classList.add("send__img__disabled");
    this.chatForm.classList.remove("form__active");
  }
  
  readyUploadImage(event){
    this.imageToBeUpload = event;
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

//   handleSelection(event) {
//     const emojiPicker = document.getElementsByTagName('emoji-picker')[0] as HTMLElement;
//     if (!this.message.text) {
//       this.message.text = '';
//     }
//     this.message.text += event.char;
//     emojiPicker.style.display = "none";
//     this.toggled = false;
//     this.sendBtn.classList.remove("send__img__disabled");
//     this.chatForm.classList.add("form__active");
//   }
}
