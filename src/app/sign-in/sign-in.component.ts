import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from '../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

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
    const nameRegex = /^[a-zA-ZäöüÄÖÜß0-9_\- ]{3,32}$/;
    this.validSigninName = nameRegex.test(name);
    this.validateSigninForm();
  }

  validateSigninEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.validSigninEmail = emailRegex.test(email);
    this.validateSigninForm();
  }

  validateSigninPassword(password: string) {
    const passwordRegex = /^(?=.*[a-zäöü])(?=.*[A-ZÄÖÜ])(?=.*[@#$%^&+=!])(?=.*[a-zA-ZäöüÄÖÜ@#$%^&+=!]).{8,}$/;
    this.validSigninPassword = passwordRegex.test(password);
    this.validateSigninForm();
  }

  validateSigninForm() {
    this.validSigninForm = this.validSigninName && this.validSigninEmail && this.validSigninPassword;
  }

  constructor(public firestore: AngularFirestore,
    private router: Router) { }

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
    this.regSuccessAnimation();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1600);
  }

  addNewUserToFirebase(userId) {
    this.user.uid = userId
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
  }

  regSuccessAnimation() {
    this.regSuccess.nativeElement.classList.add('is__active');
    setTimeout(() => {
      this.regSuccess.nativeElement.style.display = "none";
    }, 1450);
  }
}