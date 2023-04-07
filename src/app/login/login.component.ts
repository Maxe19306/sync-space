import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userID;
  CurrentUser = [];
  constructor(
    private firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }


  login(email, password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
    this.router.navigate(["generalView"])
  }
}
