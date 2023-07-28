import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../models/user.class';
import { take, map } from 'rxjs/operators';
import { currentUser } from '../models/currentUser.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('mail', { static: true }) mailInput: ElementRef<HTMLInputElement>;
  @ViewChild('password', { static: true }) passwordInput: ElementRef<HTMLInputElement>;

  validMailAddress: boolean = true;
  validMailPassword: boolean = true;

  user: User = new User({});
  currentUser: currentUser = new currentUser;
  provider = new GoogleAuthProvider();
  userID;  // ist die id von auth. ist nur für den login wichtig und um herauszubekommen welcher user aus firbase databank der aktive ist
  auth = getAuth();
  constructor(
    private firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  focusMailInput() {
    this.mailInput.nativeElement.focus();
  }

  focusPasswordInput() {
    this.passwordInput.nativeElement.focus();
  }

  login(email, password) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.userID = userCredential.user.uid;
        this.determineTheCurrentUser()
      })
      .catch((error) => {
        console.log("Wrong user data");
      });
  }


  // lädt alle user runter und vergleicht die uid um den eingeloggten User herauszufinden
  determineTheCurrentUser() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'id' })
      .subscribe((allUsers: any) => {
        this.currentUser = allUsers.find((user) => user.uid === this.userID)

        this.router.navigate(['/generalView'], { queryParams: { userID: this.currentUser.id } });
      })

  }


  // login mit google. es wird danach ein user in firestore database noch angelegt.
  loginWithGoogle() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {

        this.addNewUserToFirebase(result.user.displayName, result.user.email, result.user.uid)
      })
      .catch((error) => {

      });


  }
  // prüft ob es bereits den user mit der userid gibt. wenn nicht wird ein neuer erstellt.
  addNewUserToFirebase(name, email, userID) {
    this.checkIfUserExists(userID).subscribe(exists => {
      if (exists) {
        this.userID = userID;
        this.determineTheCurrentUser()
      } else {
        this.addNewUser(userID, name, email)
      }
    });
  }

  // fügt einen neuen user zu firbase hinzu
  addNewUser(userID, name, email) {
    this.user.uid = userID;
    this.user.name = name;
    this.user.mail = email;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then(() => {

        this.determineTheCurrentUser()
      })
  }

  checkIfUserExists(uid) {
    return this.firestore.collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'customIdName' })
      .pipe(
        take(1),
        map(users => users.length > 0)
      );
  }




}
