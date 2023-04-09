import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.class';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User({});
  provider = new GoogleAuthProvider();
  userID;
  auth = getAuth();
  CurrentUser = [];
  constructor(
    private firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }


  login(email, password){
    
    signInWithEmailAndPassword(this.auth, email, password)
  .then((userCredential) => {
  this.userID = userCredential.user.uid;
  this.determineTheCurrentUser()
  })
  .catch((error) => {
   console.log(error)
  });
  }


  // lädt alle user runter und vergleicht die uid um den eingeloggten User herauszufinden
  determineTheCurrentUser(){
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((allUsers:any) => {
      this.CurrentUser = allUsers.find((user) => user.uid === this.userID)
      console.log(this.CurrentUser)
    })
    this.router.navigate(["generalView"]);
  }

  loginWithGoogle(){
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      console.log('login', result.user) // Login erfolgreich
      this.addNewUserToFirebase(result.user.displayName, result.user.email, result.user.uid)
    })
    .catch((error) => {
      console.log('fehler', error) // Fehler beim Login
    });


  }

  addNewUserToFirebase(name, email, userID) {
    this.checkIfUserExists(userID).subscribe(exists => {
      if (exists) {
        console.log('User already exists');
      } else {
        this.user.uid = userID;
        this.user.Name = name;
        this.user.mail = email;
  
        this.firestore
          .collection('users')
          .add(this.user.toJSON())
          .then(() => {
            console.log('User added to Firestore');
          })
          .catch(error => {
            console.error('Error adding user to Firestore', error);
          });
      }
    });
  }

checkIfUserExists(uid) {
  return this.firestore.collection('users', ref => ref.where('uid', '==', uid))
    .valueChanges({idField: 'customIdName'})
    .pipe(
      take(1),
      map(users => users.length > 0)
    );
}
}
