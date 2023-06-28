import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from '../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  @ViewChild('name', { static: true }) nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('mail', { static: true }) mailInput: ElementRef<HTMLInputElement>;
  @ViewChild('password', { static: true }) passwordInput: ElementRef<HTMLInputElement>;

  validSigninEmail: boolean = false;

  user: User = new User({});

  validateSigninEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.validSigninEmail = emailRegex.test(email);
  }

  constructor( public firestore: AngularFirestore ) { }

  ngOnInit(): void {
  }

  focusSigninNameInput() {
    this.nameInput.nativeElement.focus();
  }

  focusSigninMailInput() {
    this.mailInput.nativeElement.focus();
  }

  focusSigninPasswordInput() {
    this.passwordInput.nativeElement.focus();
  }

  createAccount(password, userForm) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.user.mail, password.value)
      .then((userCredential) => {
        this.addNewUserToFirebase(userCredential.user.uid)
      })
    password.value = '';
  }

  addNewUserToFirebase(userID) {
    this.user.uid = userID
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
  }
}