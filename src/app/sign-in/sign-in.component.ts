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
  @ViewChild('regSuccess', { static: false }) regSuccess: ElementRef;

  validSigninName: boolean = false;
  validSigninEmail: boolean = false;
  validSigninPassword: boolean = false;
  validSigninForm: boolean = false;

  user: User = new User({});

  validateSigninName(name: string) {
    const emailRegex = /^[A-Za-z0-9_]{1,16}$/;
    this.validSigninName = emailRegex.test(name);
    this.validateSigninForm();
  }

  validateSigninEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.validSigninEmail = emailRegex.test(email);
    this.validateSigninForm();
  }

  validateSigninPassword(password: string) {
    const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z\d@#$%^&+=!]).{8,}$/;
    this.validSigninPassword = emailRegex.test(password);
    this.validateSigninForm();
  }

  validateSigninForm() {
    this.validSigninForm = this.validSigninName && this.validSigninEmail && this.validSigninPassword;
  }

  constructor(public firestore: AngularFirestore) { }

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

  regSuccessAnimation() {
    this.regSuccess.nativeElement.classList.toggle('is__active');
  }
}