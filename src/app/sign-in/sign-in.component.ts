import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from '../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('name', { static: true }) nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('mail', { static: true }) mailInput: ElementRef<HTMLInputElement>;
  @ViewChild('password', { static: true }) passwordInput: ElementRef<HTMLInputElement>;

  userValidate = {
    name: '',
    mail: '',
    password: ''
  };

  @ViewChild('userForm') userForm: NgForm;

  user: User = new User({});

  constructor(
    public firestore: AngularFirestore,
  ) { }

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

  validateForm() {
    let nameValidation = this.validateName(this.userValidate.name);
    let mailValidation = this.validateMail(this.userValidate.mail);
    let passwordValidation = this.validatePassword(this.userValidate.password);

    if (nameValidation && mailValidation && passwordValidation) {
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  }

  validateName(name: string): boolean {
    let nameParts = name.trim().split(' ');
    console.log("nameParts", nameParts);

    if (nameParts.length !== 2) {
      console.log('Name should consist of first name and last name');
      return false;
    }

    for (let part of nameParts) {
      if (part.length < 2) {
        console.log('Each part of name should contain at least two characters');
        return false;
      }
    }

    return true;
  }

  validateMail(mail: string): boolean {
    let mailParts = mail.split('@');

    if (mailParts.length !== 2) {
      console.log('Mail should contain @ character');
      return false;
    }

    if (mailParts[0].length < 2) {
      console.log('Mail should contain at least two characters before @');
      return false;
    }

    let domainParts = mailParts[1].split('.');

    if (domainParts.length < 2) {
      console.log('Mail should contain . after @');
      return false;
    }

    if (domainParts[0].length < 2 || domainParts[1].length < 2) {
      console.log('Mail should contain at least two characters after @ and .');
      return false;
    }

    return true;
  }

  validatePassword(password: string): boolean {
    if (password.length < 8) {
      console.log('Password should contain at least 8 characters');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      console.log('Password should contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      console.log('Password should contain at least one lowercase letter');
      return false;
    }

    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
      console.log('Password should contain at least one special character');
      return false;
    }

    return true;
  }

  isFormValid(): boolean {
    return this.validateName(this.userValidate.name) &&
      this.validateMail(this.userValidate.mail) &&
      this.validatePassword(this.userValidate.password);
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
